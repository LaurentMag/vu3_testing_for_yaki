<template>
  <section class="card-unit-wrapper">
    <div>
      <h1>{{ artistprops!.name ?? "error" }}</h1>
      <p>{{ artistprops!.country ?? "error" }}</p>
    </div>

    <button @click.prevent="sendGenre">Select</button>
  </section>
</template>

<!-- ------------------------------------------------------------ -->

<script setup lang="ts">
import type {Artiste} from "@/entities/Artiste";
import type {PropType} from "vue";

const props = defineProps({
  artistprops: {
    type: Object as PropType<Artiste>,
    required: true,
  },
});

//const emit = defineEmits(["getSongGenre"]);
// OR CAN DO :
const emit = defineEmits({
  getSongGenre(response: string) {
    // can do check on values to apply or not the emit
    // here just check its true && not empty string
    if (response && response.trim() !== "") {
      return true;
    }
    return false;
  },
});

const sendGenre = () => {
  emit("getSongGenre", `${props.artistprops.name}, ${props.artistprops.genre}`);
};
</script>

<!-- ------------------------------------------------------------ -->

<style lang="scss">
.card-unit-wrapper {
  width: min(90%, 20rem);
  height: 10rem;
  padding: 1rem;

  border: 1px solid black;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 1.2rem;
    font-weight: 600;
  }
}
</style>
