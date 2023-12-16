import type {ListElementType} from "@/entities/dragAndDropType";
import {ref, reactive} from "vue";

export function useCloneDrag() {
  /**
   * Ref to the container of the clone element
   */
  const pageContentHTMLElement = ref<HTMLElement | null>(null);

  /**
   * on mouse down get mouse intial position
   */
  let intialMousePos = reactive({
    x: 0,
    y: 0,
  });

  let draggableElement = reactive({
    element: null as ListElementType | null,
    x: 0,
    y: 0,
    translateX: 0,
    translateY: 0,
    transition: 0.005,
    ease: "linear",
    isDragging: false,
  });

  const resetCloneToDragReactive = () => {
    // Reset cloneToDrag here
    draggableElement.element = null;
    draggableElement.x = 0;
    draggableElement.y = 0;
    draggableElement.translateX = 0;
    draggableElement.translateY = 0;
    draggableElement.transition = 0.005;
    draggableElement.ease = "linear";
    draggableElement.isDragging = false;
  };

  const onDragStopSetting = () => {
    draggableElement.translateX = 0;
    draggableElement.translateY = 0;
    draggableElement.transition = 0.3;
    draggableElement.ease = "ease-in";
    draggableElement.isDragging = false;

    setTimeout(() => {
      resetCloneToDragReactive();
    }, 300);
  };

  // on select item to drag
  const setClonePosition = (elemToClone: HTMLElement) => {
    if (!draggableElement.element || !pageContentHTMLElement.value) {
      return;
    }

    const rectSelectedItem = elemToClone.getBoundingClientRect();
    const rectContentContainer = pageContentHTMLElement.value!.getBoundingClientRect();

    // set initial position of the clone
    // get the position of the original element, and subtract the position of the page container
    // to get the position of the element relative to the page container
    draggableElement.x = rectSelectedItem.x - rectContentContainer.x;
    draggableElement.y = rectSelectedItem.y - rectContentContainer.y;
  };

  return {
    pageContentHTMLElement,
    intialMousePos,
    draggableElement,
    onDragStopSetting,
    setClonePosition,
  };
}
