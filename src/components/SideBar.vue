<template>
  <nav
    class="sidebar"
    :class="{open: classSwitch}"></nav>
</template>

<script setup lang="ts">
const props = defineProps({
  classSwitch: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="scss">
.sidebar {
  background-color: #353535;
}
</style>
