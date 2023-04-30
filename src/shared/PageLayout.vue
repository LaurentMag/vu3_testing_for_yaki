<template>
  <div class="grid-container">
    <section class="page-layout">
      <header-comp />

      <side-bar />
      <main class="content">
        <slot></slot>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import HeaderComp from "@/components/HeaderComp.vue";
import SideBar from "@/components/SideBar.vue";
</script>

<style lang="scss">
.grid-container {
  // all height need to be set from body to this container
  height: 100%;
  // flex for flex 1
  display: flex;
}

.page-layout {
  // fil leftover aviable space
  flex: 1;
  display: grid;
  grid-template-rows: 5rem auto;
  grid-template-columns: 15rem auto;
}

.header {
  grid-row: 1;
  grid-column: 1/3;
}

.sidebar {
  grid-row: 2;
  grid-column: 1/2;
}

.content {
  overflow: hidden;
  padding-block: 4rem;
  padding-inline: 0.5rem;
  grid-row: 2;
  grid-column: 2/3;
  background-color: #2ecc71;
}
</style>
