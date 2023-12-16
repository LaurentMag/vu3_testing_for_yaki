<script setup lang="ts">
import Text from "@/ui/components/Text.vue";
</script>

<template>
  <article class="homecontent-container">
    <Text />
  </article>
</template>

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
