<script setup lang="ts">
import {ref, type PropType} from "vue";
import ListElement from "./ListElement.vue";
import type {ItemType, DraggedItem} from "@/entities/dragAndDropType";

const isDraggingOver = ref(false);

const props = defineProps({
  listName: {
    type: String,
    required: true,
  },
  list: {
    type: Array as PropType<ItemType[]>,
    required: true,
  },
});

const emit = defineEmits(["emitDragStart", "emitDragDrop"]);

const onDragStart = (item: ItemType) => {
  emit("emitDragStart", item, props.list);
};

const onDragDrop = () => {
  emit("emitDragDrop", props.list);
};

const onDragEnter = (event: DragEvent) => {
  if (event.target === event.currentTarget) {
    console.log("drag enter");
  }
};

const onDragOver = (event: DragEvent) => {
  if (event.target === event.currentTarget) {
    console.log("drag over");
  }
};

const onDragLeave = (event: DragEvent) => {
  if (event.target === event.currentTarget) {
    console.log("drag leave");
  }
};
</script>

<template>
  <div
    :class="['list', isDraggingOver ? 'dragging_over' : '']"
    @drop="onDragDrop()"
    @dragenter.prevent="onDragEnter($event)"
    @dragover.prevent="onDragOver($event)"
    @dragleave.pevent="onDragLeave($event)">
    <h2>{{ listName }}</h2>
    <list-element
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      @emitDragStart="onDragStart(item)">
    </list-element>
  </div>
</template>

<style lang="scss" scoped>
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
./dragAndDropType
