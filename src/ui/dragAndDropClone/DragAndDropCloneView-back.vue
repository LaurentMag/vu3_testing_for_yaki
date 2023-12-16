<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import ListElementClone from "./ListElementClone.vue";
import type {ItemType} from "@/entities/dragAndDropType";
import {useMousePos} from "@/composable/useMousePos";
import {useEventTargetListener} from "@/composable/useEventListener";

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

let pageContainer = reactive({
  element: null as HTMLElement | null,
  offsetX: 0,
  offsetY: 0,
});

let cloneDraggedElement = reactive({
  element: null as HTMLElement | null,
});

onMounted(() => {
  pageContainer.element = document.querySelector(".drop_down_clone_container")!;
});

const {x, y} = useMousePos();

const mouseMove = () => {
  let xOffset = x.value - pageContainer.offsetX;
  let yOffset = y.value - pageContainer.offsetY;

  if (cloneDraggedElement.element) {
    //cloneDraggedElement.element.style.transform = `translateX(${xOffset}px) translateY(${yOffset}px)`;
  }
};

const selectItemToDrag = (event: MouseEvent, item: ItemType) => {
  event.preventDefault();
  window.addEventListener("mousemove", mouseMove);

  let selectedItem = document.getElementById(item.id.toString());

  pageContainer.offsetX = pageContainer.element?.getBoundingClientRect().x!;
  pageContainer.offsetY = pageContainer.element?.getBoundingClientRect().y!;

  createClone(item);
};

const onMouseUp = () => {
  window.removeEventListener("mousemove", mouseMove);
  // if (cloneDraggedElement.element && cloneDraggedElement.element.parentNode) {
  //   cloneDraggedElement.element.parentNode.removeChild(cloneDraggedElement.element);
  //   cloneDraggedElement.element = null;
  // }
};
useEventTargetListener(window, "mouseup", onMouseUp);

const createClone = (item: ItemType) => {
  let selectedItem = document.getElementById(item.id.toString());
  // Get the position of the original element

  // let xOffset = x.value - pageContainer.offsetX;
  // let yOffset = y.value - pageContainer.offsetY;

  let xOffset = 0;
  let yOffset = 0;

  if (selectedItem) {
    cloneDraggedElement.element = selectedItem.cloneNode(true) as HTMLElement;
    cloneDraggedElement.element.classList.add("list_item-cloned");

    //cloneDraggedElement.element.style.transform = `translateX(${xOffset}px) translateY(${yOffset}px)`;

    let rect = selectedItem.getBoundingClientRect();
    let xOffset = rect.left - pageContainer.element?.getBoundingClientRect().left!;
    let yOffset = rect.top - pageContainer.element?.getBoundingClientRect().top!;

    cloneDraggedElement.element.style.left = `${xOffset}px`;
    cloneDraggedElement.element.style.top = `${yOffset}px`;

    if (pageContainer.element instanceof Element) {
      pageContainer.element.appendChild(cloneDraggedElement.element);
    }
  }
};
</script>

<template>
  <div class="drop_down_clone_container">
    <section :class="['list-clone']">
      <h2>Clone List 1</h2>
      <list-element-clone
        v-for="item in list1"
        v-on:mousedown="(event) => selectItemToDrag(event, item)"
        :key="item.id"
        :item="item" />
    </section>

    <section :class="['list-clone']">
      <h2>Clone List 2</h2>
      <list-element-clone
        v-for="item in list2"
        v-on:mousedown.prevent="(event) => selectItemToDrag(event, item)"
        :key="item.id"
        :item="item" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.list_item-cloned {
  position: absolute;
  z-index: 1;
  text-align: center;
  width: 249px;
  padding: 0.5rem;
  border: 1px solid #969696;
  border-radius: 0.5rem;

  background-color: #e1e0e0;

  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  // transition: opacity 0.25s ease-in-out, transform 0.1s ease-in-out;
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

  padding: 1rem 1rem;

  width: 20rem;
}

h2 {
  font-size: 1.5rem;
  border-bottom: 1px solid #969696;

  margin-bottom: 1rem;
  width: 90%;
}
</style>
