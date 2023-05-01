<template>
  <p>component counter 1</p>
  <button @click="globalCount.increment()">global counter : {{ globalCount.count }}</button>
</template>

<script setup lang="ts">
// global reactive used here with button and button text display
import {globalCount} from "@/services/globalCount";
</script>
