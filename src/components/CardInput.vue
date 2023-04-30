<template>
  <input
    type="text"
    @input="inputTyping($event)" />
</template>

<script setup lang="ts">
const emit = defineEmits({
  // getInputvalue is the prop name defined in cardView
  getInputvalue(value: string) {
    if (value !== "") {
      return true;
    }
    return false;
  },
});

const inputTyping = (e: Event) => {
  const target = e.target as HTMLInputElement;

  emit("getInputvalue", target.value);
};
</script>
