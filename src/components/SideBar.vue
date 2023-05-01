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
  // grid declaration in PageLayout
  grid-row: 2;
  grid-column: 1/2;

  transition: transform 0.15s ease-out;

  background-color: #353535;
}

@media (max-width: 850px) {
  .sidebar {
    // grid declaration in PageLayout
    grid-column: 1/3;
    transform: translateX(100%);
    z-index: 1;

    background-color: #353535bc;
    backdrop-filter: blur(7px);
  }

  .open {
    transform: translateX(0);
  }
}
</style>
