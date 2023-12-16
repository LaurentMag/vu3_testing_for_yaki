<script setup lang="ts">
import type {ListElementType} from "@/entities/dragAndDropType";
import {ref, type PropType, onBeforeMount} from "vue";

const isMounted = ref(false);
const isDragged = ref(false);

onBeforeMount(() => {
  // console.log("before mounted", props.item.id, props.item.name);
  isMounted.value = true;

  // to remove the animation class
  setTimeout(() => {
    isMounted.value = false;
  }, 250);
});

const props = defineProps({
  item: {
    type: Object as PropType<ListElementType>,
    required: true,
  },
});

const emit = defineEmits(["emitDragStart"]);

const onDragStart = (event: DragEvent) => {
  isDragged.value = true;

  emit("emitDragStart", event);
};

const onDragEnd = (event: DragEvent) => {
  isDragged.value = false;
};
</script>

<template>
  <div
    :class="[
      'list_item',
      isMounted ? 'drag_end_class' : '',
      isDragged ? 'drag_transition' : '',
    ]"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd">
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

  transition: opacity 0.25s ease-in-out, transform 0.1s ease-in-out;
}
.drag_transition {
  background-color: #bababa;
  opacity: 0.1;
  transform: scale(0.9);
}

.drag_end_class {
  // opacity: 1;
  // transform: scale(1);
  animation: animDragEnd 0.25s ease-in-out forwards;
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
./dragAndDropType
