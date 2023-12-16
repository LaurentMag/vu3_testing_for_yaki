<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import ListElementClone from "./ListElementClone.vue";
import type {ItemType} from "@/entities/dragAndDropType";

const list1 = ref([
  {id: 1, name: "Item 1"},
  {id: 2, name: "Item 2"},
  {id: 3, name: "Item 3"},
]);
const list2 = ref([
  {id: 4, name: "Item 4"},
  {id: 5, name: "Item 5"},
  {id: 6, name: "Item 6"},
]);

onMounted(() => {
  DragAndDropContainer.element = document.querySelector(".drop_down_clone_container")!;
});

let DragAndDropContainer = reactive({
  element: null as HTMLElement | null,
});

let intialMousePos = reactive({
  x: 0,
  y: 0,
});

let cloneToDrag = reactive({
  element: null as ItemType | null,
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
  cloneToDrag.element = null;
  cloneToDrag.x = 0;
  cloneToDrag.y = 0;
  cloneToDrag.translateX = 0;
  cloneToDrag.translateY = 0;
  cloneToDrag.transition = 0.005;
  cloneToDrag.ease = "linear";
  cloneToDrag.isDragging = false;
};

const onDragStopSetting = () => {
  cloneToDrag.isDragging = false;
  cloneToDrag.transition = 0.35;
  cloneToDrag.ease = "ease-in";
  cloneToDrag.translateX = 0;
  cloneToDrag.translateY = 0;

  setTimeout(() => {
    resetCloneToDragReactive();
  }, 450);
};

const setClonePosition = () => {
  if (!cloneToDrag.element || !DragAndDropContainer.element) {
    return;
  }
  const selectedItem = document.getElementById(`${cloneToDrag.element.id.toString()}`);
  const rectSelectedItem = selectedItem!.getBoundingClientRect();
  const rectPageContainer = DragAndDropContainer.element!.getBoundingClientRect();

  // set initial position of the clone
  // get the position of the original element, and subtract the position of the page container
  // to get the position of the element relative to the page container
  cloneToDrag.x = rectSelectedItem.x - rectPageContainer.x;
  cloneToDrag.y = rectSelectedItem.y - rectPageContainer.y;
};

// mouse down on item to drag
const onSelectedItemToDrag = (event: MouseEvent, item: ItemType) => {
  event.preventDefault(); // prevent to select text when mouse move while mouse down

  DragAndDropContainer.element!.addEventListener("mousemove", mouseMove);
  DragAndDropContainer.element!.addEventListener("mouseup", onMouseUp);

  // set the intial mouse position on mouse down on the item that will be cloned and dragged
  intialMousePos.x = event.clientX;
  intialMousePos.y = event.clientY;

  cloneToDrag.element = item;
  cloneToDrag.isDragging = true;

  setClonePosition();
};

const mouseMove = (event: MouseEvent) => {
  if (cloneToDrag.element) {
    cloneToDrag.translateX = event.clientX - intialMousePos.x;
    cloneToDrag.translateY = event.clientY - intialMousePos.y;
  }
};

const onMouseUp = () => {
  onDragStopSetting();

  DragAndDropContainer.element!.removeEventListener("mousemove", mouseMove);
  DragAndDropContainer.element!.removeEventListener("mouseup", onMouseUp);
};

const onMouseEnter = () => {
  if (!cloneToDrag.isDragging) {
    return;
  }
  console.log("mouse enter");
};
</script>

<template>
  <div class="drop_down_clone_container">
    <section
      :class="['list-clone']"
      v-on:mouseenter="onMouseEnter()">
      <h2>Clone List 1</h2>
      <list-element-clone
        v-for="item in list1"
        v-on:mousedown="(event: MouseEvent) => onSelectedItemToDrag(event, item)"
        :key="item.id"
        :item="item" />
    </section>

    <section
      :class="['list-clone']"
      v-on:mouseenter="onMouseEnter()">
      <h2>Clone List 2</h2>
      <list-element-clone
        v-for="item in list2"
        v-on:mousedown.prevent="(event: MouseEvent) => onSelectedItemToDrag(event, item)"
        :key="item.id"
        :item="item" />
    </section>

    <list-element-clone
      v-if="cloneToDrag.element"
      :class="['list_item-cloned', cloneToDrag.isDragging ? 'on-drag-anim' : 'on-drag-stop']"
      :style="{
        left: `${cloneToDrag.x}px`,
        top: `${cloneToDrag.y}px`,
        transform: `translate(${cloneToDrag.translateX}px, ${cloneToDrag.translateY}px)`,
        transition: `transform ${cloneToDrag.transition}s linear`,
      }"
      :key="cloneToDrag.element.id"
      :item="cloneToDrag.element" />
  </div>
</template>

<style lang="scss" scoped>
.list_item-cloned {
  position: absolute;
  z-index: 1;
  width: 257.5px;
  // allow to have the mouse "ignore" the clone element
  // to trigger mouse events on the element below it
  pointer-events: none;

  background-color: rgb(209, 206, 206);
}

@keyframes getBigger {
  from {
    scale: 1;
  }
  to {
    scale: 1.1;
  }
}

.on-drag-anim {
  animation: getBigger 0.25s ease-in-out forwards;
}

.on-drag-stop {
  animation: getBigger 0.25s ease-in-out reverse forwards;
}

.drop_down_clone_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  padding-block: 2rem;

  background-color: #e1e0e0;
}

.list-clone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #969696;

  padding: 1rem;

  width: 20rem;

  &:hover {
    box-shadow: 0 0 0 1px #969696;
  }
}

h2 {
  font-size: 1.5rem;
  border-bottom: 1px solid #969696;

  margin-bottom: 1rem;
  width: 90%;
}
</style>
