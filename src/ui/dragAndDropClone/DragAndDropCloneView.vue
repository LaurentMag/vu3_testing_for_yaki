<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import CloneListElement from "./CloneListElement.vue";
import ClonedElement from "./ClonedElement.vue";
import type {ListElementType} from "@/entities/dragAndDropType";

import {useCloneDrag} from "@/composable/useCloneDrag";
import {ArrayOfObjWithList} from "@/data/lists";

const {
  pageContentHTMLElement,
  draggableElement,
  intialMousePos,
  onDragStopSetting,
  setClonePosition,
} = useCloneDrag();

const lists = ref(ArrayOfObjWithList);

// mouse down on item to drag
// parameter emited from the list element clone
const onMouseDownOnItemToDrag = (
  event: MouseEvent,
  item: ListElementType,
  elemToClone: HTMLElement
) => {
  event.preventDefault(); // prevent to select text when mouse move while mouse down

  pageContentHTMLElement.value!.addEventListener("mousemove", mouseMove);
  pageContentHTMLElement.value!.addEventListener("mouseup", onMouseUp);

  // get, and set the intial mouse position on mouse down on the item that will be cloned and dragged
  intialMousePos.x = event.clientX;
  intialMousePos.y = event.clientY;

  draggableElement.element = item;
  draggableElement.isDragging = true;

  setClonePosition(elemToClone);
};

const mouseMove = (event: MouseEvent) => {
  if (draggableElement.element) {
    draggableElement.translateX = event.clientX - intialMousePos.x;
    draggableElement.translateY = event.clientY - intialMousePos.y;
  }
};

const onMouseUp = () => {
  onDragStopSetting();

  pageContentHTMLElement.value!.removeEventListener("mousemove", mouseMove);
  pageContentHTMLElement.value!.removeEventListener("mouseup", onMouseUp);
};

const onMouseEnter = () => {
  if (!draggableElement.isDragging) {
    return;
  }
  console.log("mouse enter");
};
</script>

<template>
  <div
    class="page-container__list-clone"
    ref="pageContentHTMLElement">
    <section
      v-for="list in lists"
      :class="['list-clone__container']"
      v-on:mouseenter="onMouseEnter()">
      <h2>Clone {{ list.name }}</h2>
      <clone-list-element
        v-for="item in list.list"
        @onMouseDownOnItem="onMouseDownOnItemToDrag"
        :key="item.id"
        :item="item"
        :draggedElement="draggableElement.element" />
    </section>

    <cloned-element
      v-if="draggableElement.element"
      ref="draggableElementRef"
      :class="[draggableElement.isDragging ? 'on-drag-anim' : 'on-drag-drop-reset']"
      :style="{
        left: `${draggableElement.x}px`,
        top: `${draggableElement.y}px`,
        transform: `translate(${draggableElement.translateX}px, ${draggableElement.translateY}px)`,
        transition: `transform ${draggableElement.transition}s linear`,
      }"
      :item="draggableElement.element" />
  </div>
</template>

<style lang="scss" scoped>
.page-container__list-clone {
  padding: 2rem;
  display: flex;
  // flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5rem;

  padding-block: 2rem;

  background-color: $color-page-content;
  overflow: hidden;
}

.list-clone__container {
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

// CLONED ITEM ===================================================================================

.on-drag-anim {
  animation: getBigger 0.25s ease-in-out forwards;
}

.on-drag-stop {
  animation: getBigger 0.25s ease-in-out reverse forwards;
}

.on-drag-drop-reset {
  animation: dragStop 0.2s ease-in-out forwards;
  animation-delay: 0.15s;
}

@keyframes dragStop {
  from {
    opacity: 0.75;
    scale: 1;
  }
  to {
    opacity: 0.15;
    scale: 0.9;
  }
}

@keyframes getBigger {
  from {
    scale: 1;
  }
  to {
    scale: 1;
  }
}
</style>
