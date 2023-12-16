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

<!-- --------------------------------------------------------------- -->

<template>
  <section class="home">
    <p>This Counter , option api</p>
    <button @click="increaseCounter">Counter : {{ count }}</button>
  </section>
</template>

<style lang="scss">
.home {
  background-color: $color-page-content;
  padding: 1rem;

  button {
    font-weight: bold;
  }
}
</style>
