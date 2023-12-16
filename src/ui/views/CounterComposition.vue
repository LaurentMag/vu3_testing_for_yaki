<script setup lang="ts">
import CounterCompoOne from "@/ui/components/counterCompoOne.vue";
import CounterCompoTwo from "@/ui/components/counterCompoTwo.vue";

import {globalCount} from "@/store/globalCount";
</script>

<!-- --------------------------------------------------------------- -->

<template>
  <section class="counter-comp-wrapper">
    <article>
      <p>This is counter view with composition logic</p>
      <div class="button-div">
        <button @click="globalCount.increment()">
          global counter : {{ globalCount.count }}
        </button>
        <button @click="globalCount.reset()">Reset global count</button>
      </div>
    </article>
    <article class="child-counter">
      <counter-compo-one />
      <counter-compo-two />
    </article>
  </section>
</template>

<!-- --------------------------------------------------------------- -->

<style lang="scss">
.counter-comp-wrapper {
  background-color: $color-page-content;

  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.button-div {
  padding: 1rem;
  max-width: 15rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.child-counter {
  padding: 1rem;
  max-width: 15rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
@/assets/globalCount.js
