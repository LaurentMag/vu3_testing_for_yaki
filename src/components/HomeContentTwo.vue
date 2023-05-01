<script setup lang="ts">
import Text from "@/components/Text.vue";
</script>

<!-- --------------------------------------------------------------- -->

<template>
  <section class="content-container">
    <div class="inner-container">
      <Text />
    </div>
  </section>
</template>

<!-- --------------------------------------------------------------- -->

<style lang="scss">
.content-container {
  display: flex;
  justify-content: center;

  padding: 4rem;

  background-color: rgb(88, 98, 88);

  .inner-container {
    // need to specify the height & width to make
    // sure the inner container occupy the entier space
    height: 100%;
    width: 100%;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-gutter: stable both-edges;
    scrollbar-color: rgba(3, 3, 3, 0.274) transparent;

    background-color: rgb(88, 98, 88);
  }
}
</style>
