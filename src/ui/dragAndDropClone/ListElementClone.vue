<script setup lang="ts">
import type {ItemType} from "@/entities/dragAndDropType";
import {ref, type PropType} from "vue";

const props = defineProps({
  item: {
    type: Object as PropType<ItemType>,
    required: true,
  },
});

const emit = defineEmits(["oneMouseDownOnItem"]);

const listElementClone = ref(null);

const selectItem = (event: MouseEvent) => {
  emit("oneMouseDownOnItem", event, props.item, listElementClone.value);
};
</script>

<template>
  <div
    :class="['list_item']"
    ref="listElementClone"
    :id="item.id.toString()"
    @mousedown="(event) => selectItem(event)">
    {{ item.name }}
  </div>
</template>

<style lang="scss" scoped>
.list_item {
  text-align: center;
  width: 90%;
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
.drag_transition {
  background-color: #bababa;
  opacity: 0.25;
  transform: scale(0.9);
}

.drag_start_class {
  // opacity: 0;
  // transform: scale(0.9);
  animation: animDragStart 0.25s ease-in-out forwards;
}

.drag_end_class {
  // opacity: 1;
  // transform: scale(1);
  animation: animDragEnd 0.25s ease-in-out forwards;
}

@keyframes animDragStart {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
}

@keyframes animDragEnd {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
@/ui/dragAndDrop/model
