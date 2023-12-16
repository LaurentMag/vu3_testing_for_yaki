<script setup lang="ts">
import {ref} from "vue";
import ListOfElements from "./ListOfElements.vue";
import {useDragEvents} from "@/composable/useDragEvents";
import {ArrayOfObjWithList} from "@/data/lists";

const lists = ref(ArrayOfObjWithList);

// onDragStart is invoked here to updated the reactive with the item and list that will be used in the drop event
// --- ( get the selected item from the emitter (item from the v-for in the list of element))
// --- (get the list from the list of elements emitter (the one passed as props))

// onDragDrop is invoked here to correctly update the different lists
// --- (get the list from the list of elements emitter (the one passed as props)))
const {draggedItemInfo, onDragStart, onDragDrop} = useDragEvents();
</script>

<template>
  <div class="drop_down_main_container">
    <list-of-elements
      v-for="list of lists"
      :list="list.list"
      :listName="list.name"
      :itemOriginalList="draggedItemInfo.itemOriginalList"
      @emitDragStart="onDragStart"
      @emitDragDrop="onDragDrop" />
  </div>
</template>

<style lang="scss" scoped>
.drop_down_main_container {
  padding: 2rem;
  display: flex;
  // flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5rem;

  padding-block: 2rem;

  background-color: $color-page-content;
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
