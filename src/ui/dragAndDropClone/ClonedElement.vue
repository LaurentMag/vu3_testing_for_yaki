<script setup lang="ts">
import type {ListElementType} from "@/entities/dragAndDropType";
import type {PropType} from "vue";

const props = defineProps({
  item: {
    type: Object as PropType<ListElementType>,
    required: true,
  },
});
</script>

<template>
  <div
    :class="['list_item']"
    :id="item.id.toString()">
    {{ item.name }}
  </div>
</template>

<style lang="scss" scoped>
.list_item {
  position: absolute;
  z-index: 1;

  text-align: center;
  padding: 0.5rem;
  border: 1px solid #969696;
  border-radius: 0.5rem;

  background-color: #e1e0e0;
  opacity: 0.75;

  width: 240.5px;
  // allow to have the mouse "ignore" the clone element
  // to trigger mouse events on the element below it
  pointer-events: none;
}
</style>
