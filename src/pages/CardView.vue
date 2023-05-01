<script setup lang="ts">
import type {Artiste} from "@/entities/Artiste";
import CardUnit from "@/components/CardUnit.vue";
import cardInput from "@/components/CardInput.vue";
import {reactive} from "vue";

const initialdata: Artiste[] = [
  {name: "Davido", genre: "afrobeats", country: "Nigeria"},
  {name: "Burna Boy", genre: "afrobeats", country: "Nigeria"},
  {name: "AKA", genre: "hiphop", country: "South-Africa"},
  {name: "Sarkodie", genre: "hiphop", country: "Ghana"},
  {name: "Stormzy", genre: "hiphop", country: "United Kingdom"},
  {name: "Lil Nas", genre: "Country", country: "United States"},
  {name: "Nasty C", genre: "hiphop", country: "South-Africa"},
  {name: "Shatta-walle", genre: "Reagae", country: "Ghana"},
  {name: "Khalid", genre: "pop", country: "United States"},
  {name: "ed-Sheeran", genre: "pop", country: "United Kingdom"},
];

const data = reactive({
  artists: initialdata,
  songGenre: "",
  inputValue: "",
});

const setGenre = (genre: string) => {
  data.songGenre = genre;
};

const setInputValue = (value: string) => {
  data.inputValue = value;
};
</script>

<!-- ------------------------------------------------------------ -->

<template>
  <section class="card-view-wrapper">
    <p class="card-view-title">Card view testing</p>
    <div class="card-view-emit-answer-container">
      <p><span>selected card genre : </span> {{ data.songGenre }}</p>
      <p><span>Input text : </span>{{ data.inputValue }}</p>
    </div>
    <card-input @getInputvalue="setInputValue" />
    <section class="card-view-unit-wrapper">
      <card-unit
        v-for="artist in data.artists"
        v-bind:artistprops="artist"
        @getSongGenre="setGenre" />
    </section>
  </section>
</template>

<!-- ------------------------------------------------------------ -->

<style lang="scss">
.card-view-wrapper {
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .card-view-title {
    font-weight: 900;
    font-size: 1.5rem;
  }

  .card-view-emit-answer-container {
    width: 30rem;
  }

  span {
    font-weight: 900;
  }

  .card-view-unit-wrapper {
    width: 100%;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
  }
}
</style>
