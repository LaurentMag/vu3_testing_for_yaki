<template>
  <section class="testing-stuff">
    <div class="inside-testing">
      <Text />
    </div>
  </section>
</template>

<script setup lang="ts">
import Text from "@/components/Text.vue";
</script>

<style lang="scss">
.testing-stuff {
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

    overflow: scroll;
  }
}
</style>
