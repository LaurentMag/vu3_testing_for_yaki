<script setup lang="ts">
import type {PropType} from "vue";
import type {ListElementType} from "@/entities/dragAndDropType";
import ListElement from "./ListElement.vue";
import {useDragEvents} from "@/composable/useDragEvents";

const {
  listContainerHtmlElement,
  isDraggingOver,
  isPlaceholderVisible,
  useListWatcher,
  handleDragEnterLeaveEvent,
} = useDragEvents();

const props = defineProps({
  listName: {
    type: String,
    required: true,
  },
  list: {
    type: Array as PropType<ListElementType[]>,
    required: true,
  },
  itemOriginalList: {
    type: Array as PropType<ListElementType[]>,
    required: true,
  },
});

useListWatcher(props.list);

const emit = defineEmits(["emitDragStart", "emitDragDrop"]);

const emitOnDragStart = (item: ListElementType) => {
  emit("emitDragStart", item, props.list);
};

const emitOnDragDrop = () => {
  emit("emitDragDrop", props.list);
  isDraggingOver.value = false;
  isPlaceholderVisible.value = false;
};

const onDragEntering = (event: DragEvent) => {
  handleDragEnterLeaveEvent(event, true);
};

const onDragLeaving = (event: DragEvent) => {
  handleDragEnterLeaveEvent(event, false);
};
</script>

<!-- 
dragEnter / leave / over need to be defined to have the drop event working
-->
<template>
  <div
    :class="['list-container', isDraggingOver ? 'dragging_over' : '']"
    @drop="emitOnDragDrop"
    @dragenter.prevent="onDragEntering"
    @dragover.prevent
    @dragleave.pevent="onDragLeaving"
    ref="listContainerHtmlElement">
    <h2>{{ listName }}</h2>
    <list-element
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      @emitDragStart="emitOnDragStart(item)">
    </list-element>
    <!-- <div
      v-if="isPlaceholderVisible"
      class="to-add-placeholder">
      placeholder
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #969696;

  padding: 1rem 1rem;

  width: 20rem;

  overflow: hidden;
  transition: height 0.2s ease-in;
}

h2 {
  font-size: 1.5rem;
  border-bottom: 1px solid #969696;

  margin-bottom: 1rem;
  width: 90%;
}

.dragging_over {
  background-color: #bcb9b9;
}

.to-add-placeholder {
  text-align: center;
  width: 90%;
  padding: 0.5rem;
  border: 1px solid #96969660;
  border-radius: 0.5rem;

  color: transparent;
  background-color: transparent;
}
</style>

<!-- 
    <div
      v-if="isPlaceholderVisible"
      class="to-add-placeholder">
      placeholder
    </div>


.to-add-placeholder {
  text-align: center;
  width: 90%;
  padding: 0.5rem;
  border: 1px solid #96969660;
  border-radius: 0.5rem;

  color: transparent;
  background-color: transparent;
}

-->

<!-- 
    <div
      :class="[
        'to-add-placeholder',
        isPlaceholderVisible ? 'visible' : isDraggingOver ? '' : 'invisible',
      ]">
      placeholder
    </div>


    .to-add-placeholder {
  position: relative;
  text-align: center;
  width: 90%;
  border: 1px solid #96969660;
  border-radius: 0.5rem;

  color: transparent;
  background-color: transparent;

  height: 0rem;
  padding: 0rem;
  opacity: 0;
}

.visible {
  padding: 0.5rem;
  height: auto;
  opacity: 1;

  transition: height 0.1s ease-in-out, padding 0.1s ease-in-out, opacity 0.05s ease-in-out 0.2s;
}

.invisible {
  padding: 0rem;
  height: 0rem;
  opacity: 0;

  transition: height 0.1s ease-in-out 0.05s, padding 0.1s ease-in-out 0.05s,
    opacity 0.05s ease-in-out;
}

-->
