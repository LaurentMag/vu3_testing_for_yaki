<template>
  <section>
    <article>
      <p>This is counter view with composition logic</p>
      <div class="button-div">
        <button @click="globalCount.increment">global counter : {{ globalCount.count }}</button>
        <button @click="globalCount.reset">Reset global count</button>
      </div>
    </article>
    <article class="child-counter">
      <counter-compo-one />
      <counter-compo-two />
    </article>
  </section>
</template>

<script setup lang="ts">
import CounterCompoOne from "@/components/CounterCompoOne.vue";
import CounterCompoTwo from "@/components/CounterCompoTwo.vue";

// global reactive used here with button and button text display
import {globalCount} from "@/services/globalCount.js";
</script>

<style lang="scss">
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
