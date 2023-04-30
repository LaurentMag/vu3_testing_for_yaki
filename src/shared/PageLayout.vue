<template>
  <div class="grid-container">
    <section class="page-layout">
      <header-comp>
        <button
          @click="switchNavVisibilite"
          class="burger-button">
          {{ switchSide ? "Close" : "Open" }}
        </button>
      </header-comp>
      <side-bar v-bind:classSwitch="switchSide" />
      <main class="content">
        <slot></slot>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import HeaderComp from "@/components/HeaderComp.vue";
import SideBar from "@/components/SideBar.vue";
import {ref} from "vue";

const switchSide = ref(false);

const switchNavVisibilite = () => {
  switchSide.value = !switchSide.value;
};
</script>

<style lang="scss">
.grid-container {
  // all height need to be set from body to this container
  height: 100%;
  // flex for flex 1
  display: flex;
}

.page-layout {
  // fil leftover aviable space
  flex: 1;
  display: grid;
  grid-template-rows: 5rem auto;
  grid-template-columns: minmax(20rem, 0.4fr) auto;

  .header {
    grid-row: 1;
    grid-column: 1/3;
  }
}

.sidebar {
  grid-row: 2;
  grid-column: 1/2;

  transition: transform 0.15s ease-out;
}

.content {
  background-color: #65ab82;
  overflow: hidden;
  padding-block: 4rem;
  padding-inline: 0.5rem;
  grid-row: 2;
  grid-column: 2/3;
}

.burger-button {
  display: none;
}

@media (max-width: 850px) {
  .sidebar,
  .content {
    grid-column: 1/3;
  }

  .sidebar {
    transform: translateX(100%);
    z-index: 1;

    background-color: #353535bc;
    backdrop-filter: blur(7px);
  }

  .burger-button {
    display: block;
  }

  .open {
    transform: translateX(0);
  }
}
</style>
