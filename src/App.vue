<template>
  <header-test-two />
  <section class="sidebar-content-container">
    <header class="router">
      <nav>
        <RouterLink to="/">Home Page</RouterLink>
        <RouterLink to="/counteropt">optionApi</RouterLink>
        <RouterLink to="/countercomp">compoApi</RouterLink>
        <RouterLink to="/cardview">Card view</RouterLink>
        <RouterLink to="/gaveup">Old Test</RouterLink>
      </nav>
    </header>

    <div class="page-content">
      <RouterView />
    </div>
  </section>
</template>

<script setup lang="ts">
import {RouterLink, RouterView} from "vue-router";
import HeaderTestTwo from "@/components/HeaderTestTwo.vue";
</script>

<style lang="scss">
// see asset/style.scss for #app { style }
.sidebar-content-container {
  // flex 1 to have this container take the rest of the screen space
  flex: 1;

  display: grid;
  grid-template-columns: minmax(10rem, 20rem) minmax(15rem, 1fr);
}

.router {
  background-color: rgb(43, 41, 41);

  nav {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    a {
      text-decoration: none;
      color: rgb(186, 182, 182);
      font-size: 1.2rem;
      font-weight: 900;
    }
  }
}

.page-content {
}
</style>
