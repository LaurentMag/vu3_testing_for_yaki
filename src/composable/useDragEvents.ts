import {nextTick, onMounted, ref, watch} from "vue";
import type {ListElementType, DraggedItem} from "@/entities/dragAndDropType";
import {switchItemFromListToList} from "@/utils/dragAndDropUtils";

export function useDragEvents() {
  type DraggedInfoType<T> = {
    item: T;
    itemOriginalList: T[];
  };

  /*
  The ref<DraggedItem<any>> is using any because it's a placeholder for any type that you want to use with DraggedItem. 
  This makes DraggedItem a generic type.

  In TypeScript, generics are used when we want to describe a correspondence between two values. 
  We use any here because we don't know what type T will be ahead of time. 
  It could be a string, number, custom object, etc.
  */
  const draggedItemInfo = ref<DraggedInfoType<any>>({
    item: null,
    itemOriginalList: [],
  });
  // handled by the list of element child component
  const isDraggingOver = ref(false);
  const isPlaceholderVisible = ref(false);
  const listContainerHtmlElement = ref<HTMLElement | null>(null);

  /*
  When you call onDragStart, you can pass any type of item and list as long as they are of the same type. 
  TypeScript will infer the type based on the arguments you pass in. 
  For example, if you pass a string as item and an array of strings as list, TypeScript will infer T to be string.

    let item = "apple";
    let list = ["apple", "banana", "cherry"];
    onDragStart(item, list);  // Here, T is inferred to be string
  */

  // DEFINE IN THE PARENT (the one containing all list)
  // the list is passed as a parameter to the function from the child via the emit (ListOfElement)
  /**
   * Updated reactive information about the dragged item and its original list it come from.
   * @param item
   * @param list
   */
  const onDragStart = <T>(item: T, list: T[]) => {
    draggedItemInfo.value = {
      item: item,
      itemOriginalList: list,
    };
  };

  // DEFINE IN THE PARENT (the one containing all list)
  // set the type of the element passed to the function, use the T type extended from an object with an id property
  // the list is passed as a parameter to the function from the child via the emit (ListOfElement)
  /**
   * Switch the dragged item from its original list to the list it is dropped on.
   * reset the reactive information about the dragged item and its original list it come from.
   * @param list
   */
  const onDragDrop = <T extends {id: any}>(list: T[]) => {
    switchItemFromListToList<T>(
      draggedItemInfo.value.item,
      draggedItemInfo.value.itemOriginalList,
      list
    );
    // Clear the dragged item and lists
    draggedItemInfo.value = {
      item: {id: 0, name: ""},
      itemOriginalList: [],
    };
  };

  const testCount = ref(0);

  // DEFINE IN THE LIST FOF ELEMENTS CHILD ELEMENT
  /**
   * * DragEnter : Set the isDraggingOver value to true.
   * * DragLeave : Set the isDraggingOver value to false.
   *
   * Verify if the event target is the list and not a child of the list to set isDraggingOver value.
   * If the target is a child of the list, the event is ignored using a early return.
   * @param event The DragEvent.
   * @param isDragEnter A boolean indicating whether the event is a drag enter (true) or a drag leave (false).
   * @returns early return when hovering a child of the list
   */
  const handleDragEnterLeaveEvent = <T extends {id: any}>(
    event: DragEvent,
    isDragEnter: boolean
  ) => {
    // event.target is the element on which the event originally occurred
    // event.relatedTarget is the element that the mouse is coming from (in case of mouseenter) or going to (in case of mouseleave)
    const target = event.target as HTMLElement;
    const relatedTarget = event.relatedTarget as HTMLElement;

    // Check if the related target is a child of the target
    if (target.contains(relatedTarget)) {
      return;
    }

    // Check if the target is the list itself
    if (target === event.currentTarget) {
      isDraggingOver.value = isDragEnter;
    }
  };

  /**
   * Retrive the initial height of the list container after the first render.
   * It will be used to have the initial height value instead of the auto value.
   * Te value will be used for the initial transition, that need to have starting value, which is not the case with auto.
   *
   * When the ref "listContainerHtmlElement" isnt used in the template (HTML list element), the onMounted logic will not be executed.
   */
  onMounted(async () => {
    if (!listContainerHtmlElement) return;
    // wait for the DOM to be updated
    await nextTick();
    let onMountedContainerHeight = listContainerHtmlElement.value?.clientHeight || 0;
    listContainerHtmlElement.value?.style.setProperty(
      "height",
      `${onMountedContainerHeight}px`
    );
  });

  /**
   * Vue3 watch, adjusts the height of a container based on changes in the length of a list.
   * This allows for smooth CSS transitions when the list length changes ( set transition on list container css class).
   * @param list list of element to watch
   */
  const useListWatcher = <T extends {id: any}>(list: T[]) => {
    watch(
      () => list.length,
      (newLength, oldLength) => {
        const lenghtComparison = newLength - oldLength;
        const currentContainerHeight = listContainerHtmlElement.value?.clientHeight || 0;

        switch (lenghtComparison) {
          case 0:
            return;
          case 1:
            // adding element to the list
            listContainerHtmlElement.value?.style.setProperty(
              "height",
              `${currentContainerHeight + 58}px`
            );
            return;
          case -1:
            // removing element from the list
            listContainerHtmlElement.value?.style.setProperty(
              "height",
              `${currentContainerHeight - 54}px`
            );
            return;
        }
      }
    );
  };

  return {
    draggedItemInfo,
    isDraggingOver,
    isPlaceholderVisible,
    listContainerHtmlElement,
    onDragStart,
    onDragDrop,
    handleDragEnterLeaveEvent,
    useListWatcher,
  };
}

/**
 * * DragEnter : Set the isDraggingOver value to true.
 * * DragLeave : Set the isDraggingOver value to false.
 *
 * Verify if the event target is the list and not a child of the list to set isDraggingOver value.
 * If the target is a child of the list, the event is ignored using a early return.
 *
 * Set the isPlaceholderVisible value to true when entering a list different from the original list.
 * @param event The DragEvent.
 * @param isDragEnter A boolean indicating whether the event is a drag enter (true) or a drag leave (false).
 * @param originalList The list from which the item is being dragged.
 * @param targetList The list over which the item is being dragged.
 * @returns early return when hovering a child of the list
 */

/*
  const handleDragEnterLeaveEvent = <T extends {id: any}>(
    event: DragEvent,
    isDragEnter: boolean,
    originalList: T[],
    targeList: T[]
  ) => {
    // event.target is the element on which the event originally occurred
    // event.relatedTarget is the element that the mouse is coming from (in case of mouseenter) or going to (in case of mouseleave)
    const target = event.target as HTMLElement;
    const relatedTarget = event.relatedTarget as HTMLElement;

    // Check if the related target is a child of the target
    if (target.contains(relatedTarget)) {
      return;
    }

    // Check if the target is the list itself
    if (target === event.currentTarget) {
      isDraggingOver.value = isDragEnter;

      // is entering or leaving the list
      if (isDragEnter) {
        // Check if the original list is the same as the target list, if not display the placeholder
        targeList === originalList
          ? (isPlaceholderVisible.value = false)
          : (isPlaceholderVisible.value = true);
      } else {
        isPlaceholderVisible.value = false;
      }
    }
  };

*/
