<script setup lang="ts">
import {RouterLink, RouterView} from "vue-router";
import HeaderTestTwo from "@/components/HeaderTestTwo.vue";
import {reactive} from "vue";

const teams = reactive({
  list: [1, 2, 3, 4, 5],
});

const addTeam = () => {
  teams.list.push(teams.list.length + 1);
};
</script>

<!-- --------------------------------------------------------------- -->

<template>
  <header-test-two />
  <section class="sidebar-content-container-grid">
    <nav class="router">
      <RouterLink
        to="/"
        v-slot="{isExactActive}">
        Home Page
        <div :class="{'active-team': isExactActive}">
          <div
            v-for="number in teams.list"
            :class="{'active-link': isExactActive}"></div>
        </div>
      </RouterLink>
      <RouterLink to="/counteropt">optionApi</RouterLink>
      <RouterLink to="/countercomp">compoApi</RouterLink>
      <RouterLink to="/cardview">Card view</RouterLink>
      <RouterLink to="/gaveup">Old Test</RouterLink>
      <button @click="addTeam">add team</button>
    </nav>

    <RouterView />
  </section>
</template>

<!-- --------------------------------------------------------------- -->

<style lang="scss">
// see asset/style.scss for #app { style }
.sidebar-content-container-grid {
  // flex 1 to have this container take the rest of the screen space
  flex: 1;

  display: grid;
  grid-template-columns: minmax(10rem, 20rem) minmax(80%, 1fr);
}

.router {
  background-color: rgb(43, 41, 41);

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

.active-team {
  padding: 2.5rem 1rem 1rem 1rem;
}

.active-link {
  margin-bottom: 0.8rem;
  display: block;
  width: 5rem;
  height: 1rem;
  border: 1px solid rgb(66, 152, 163);
  background-color: rgb(99, 99, 110);
}
</style>
