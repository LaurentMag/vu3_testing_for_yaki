<script setup lang="ts"></script>

<template>
  <header class="header">
    <slot></slot>
  </header>
</template>

<style lang="scss">
.header {
  background-color: #2e73a0;
  display: flex;
  align-items: center;

  padding: 1rem;

  // grid declaration in PageLayout
  grid-row: 1;
  grid-column: 1/3;
}
</style>
