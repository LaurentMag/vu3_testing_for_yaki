<script setup lang="ts">
import {ref} from "vue";
import ListOfElements from "./ListOfElements.vue";
import type {ItemType, DraggedItem} from "@/entities/dragAndDropType";

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

const draggedItemInfo = ref<DraggedItem>({
  item: {id: 0, name: ""},
  originalList: [],
});

const onDragStart = (item: ItemType, list: ItemType[]) => {
  draggedItemInfo.value = {
    item: item,
    originalList: list,
  };
};

const onDragDrop = (list: any) => {
  console.log("on  drop");

  // Remove the dragged item from its original list
  const index = draggedItemInfo.value.originalList.findIndex(
    (item) => item.id === draggedItemInfo.value.item.id
  );
  draggedItemInfo.value.originalList.splice(index, 1);

  // Add the dragged item to the new list at the dropped position
  list.push(draggedItemInfo.value.item);

  // Clear the dragged item and lists
  draggedItemInfo.value = {
    item: {id: 0, name: ""},
    originalList: [],
  };
};
</script>

<template>
  <div class="drop_down_main_container">
    <list-of-elements
      :list="list1"
      :listName="'List 1'"
      @emitDragStart="onDragStart"
      @emitDragDrop="onDragDrop" />

    <list-of-elements
      :list="list2"
      :listName="'List 2'"
      @emitDragStart="onDragStart"
      @emitDragDrop="onDragDrop" />
  </div>
</template>

<style lang="scss" scoped>
.drop_down_main_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  padding-block: 2rem;

  background-color: #e1e0e0;
}

.list {
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

.dragging_over {
  background-color: #196d9a;
}
</style>

<!-- 
// ============================================================================================
// MOUSE POSITION

const mousePosInDraggedItem = (event: MouseEvent) => {
  const draggedItem = document.querySelector(".dragging_class") as HTMLElement;
  const rect = draggedItem.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log(x, y);
  console.log(event.clientX, event.clientY);
};

  //document.addEventListener("mousemove", mousePosInDraggedItem);

// const onDragEnd = () => {
//   //document.removeEventListener("mousemove", mousePosInDraggedItem);
// };

-->
./dragAndDropType
