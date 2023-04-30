<template>
  <header class="router">
    <nav>
      <RouterLink to="/">Home Page</RouterLink>
      <RouterLink to="/counteropt">optionApi counter</RouterLink>
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
.router {
  background-color: rgb(84, 84, 84);

  nav {
    padding: 2rem;
    display: flex;
    gap: 2rem;
    a {
      text-decoration: none;
      color: rgb(186, 182, 182);
      font-size: 1.3rem;
      font-weight: 900;
    }
  }
}
</style>
