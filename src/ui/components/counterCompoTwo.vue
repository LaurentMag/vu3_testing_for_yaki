<script setup lang="ts">
// global reactive used here with button and button text display
import {globalCount} from "@/store/globalCount";
</script>

<template>
  <p>component counter 2</p>
  <button @click="globalCount.increment()">global counter : {{ globalCount.count }}</button>
</template>
@/assets/globalCount
