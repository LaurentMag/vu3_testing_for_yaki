<script setup lang="ts">
import Text from "@/components/Text.vue";
</script>

<template>
  <section class="content-container">
    <div class="inside-testing">
      <Text />
    </div>
  </section>
</template>

<style lang="scss">
.content-container {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgb(88, 98, 88);

  height: 100%;

  overflow: hidden;

  .inside-testing {
    background-color: rgb(56, 56, 58);

    // height in vh handle the height of the scrollable -container-
    // in the middle of the content component
    height: 80svh;
    width: 90%;

    overflow: auto;
  }
}
</style>
