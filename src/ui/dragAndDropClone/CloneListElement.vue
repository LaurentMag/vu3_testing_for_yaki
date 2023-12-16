<script setup lang="ts">
import type {ListElementType} from "@/entities/dragAndDropType";
import {ref, type PropType, onMounted, watch} from "vue";

const props = defineProps({
  item: {
    type: Object as PropType<ListElementType>,
    required: true,
  },
  draggedElement: {
    type: [Object, null] as PropType<ListElementType | null>,
    required: true,
  },
});

const itemHtmlElement = ref(null);
const isDragged = ref(false);

watch(
  () => props.draggedElement,
  (newVal) => {
    if (newVal && newVal.id === props.item.id) {
      isDragged.value = true;
    } else {
      isDragged.value = false;
    }
  },
  {immediate: true}
);

const emit = defineEmits(["onMouseDownOnItem"]);

const selectItem = (event: MouseEvent) => {
  emit("onMouseDownOnItem", event, props.item, itemHtmlElement.value);
};
</script>

<template>
  <div
    :class="['list_item', isDragged ? 'cloned-test' : '']"
    ref="itemHtmlElement"
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
  opacity: 0.75;

  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}

.cloned-test {
  opacity: 0.15;
  transform: scale(0.9);
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
    transform: scale(1);
  }
}

@keyframes animDragEnd {
  from {
    opacity: 0;
    transform: scale(1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
@/ui/dragAndDrop/model
