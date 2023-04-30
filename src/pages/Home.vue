<template>
  <section class="home">
    <p>This is the Home , option api</p>
    <button @click="increaseCounter">Counter : {{ count }}</button>
  </section>
</template>

<script lang="ts">
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increaseCounter() {
      this.count++;
    },
  },

  mounted() {
    //console.log("home component mounted, counter is at : ", this.count);
  },
};
</script>

<style lang="scss">
.home {
  padding: 1rem;

  button {
    font-weight: bold;
  }
}
</style>
