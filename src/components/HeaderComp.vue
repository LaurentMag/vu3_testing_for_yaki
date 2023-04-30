<template>
  <header class="header">
    <slot></slot>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.header {
  background-color: #2e73a0;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding: 1rem;
}
</style>
