<template>
  <article class="homecontent-container">
    <Text />
  </article>
</template>

<script setup lang="ts">
import Text from "@/components/Text.vue";
</script>

<style lang="scss">
.homecontent-container {
  scrollbar-width: thin;
  scrollbar-gutter: stable both-edges;
  scrollbar-color: rgba(3, 3, 3, 0.274) transparent;

  padding-inline: 2rem;
}
// .homecontent {
// }
</style>
