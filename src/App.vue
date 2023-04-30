<template>
  <header>
    <nav>
      <RouterLink to="/">optionApi counter</RouterLink>
      <RouterLink to="/countercomp">compositionApi counter</RouterLink>
      <RouterLink to="/cardview">Card view</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import {RouterLink, RouterView} from "vue-router";
import {Fragment} from "vue";
</script>

<style lang="scss">
header {
  background-color: rgb(122, 122, 122);

  nav {
    padding: 2rem;
    display: flex;
    gap: 2rem;
    a {
      text-decoration: none;
      color: black;
      font-size: 1.3rem;
    }
  }
}
</style>
