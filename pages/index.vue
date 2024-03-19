<script setup lang="ts">
import {forEach} from "@csstools/css-parser-algorithms";
import type {CharactersResponse} from "~/models/character.starpi";

const {find} = useStrapi()
const {data, pending, error} = await useAsyncData('characters', async () => {
  return await find<CharactersResponse>('characters', {
    populate: '*'
  }).then(res => res.data)
})
</script>
<template>
  <pre>{{ data }}</pre>

  <template v-if="pending">
    ça charge
  </template>
  <template v-else>
    <p>Bonjour</p>
    <div v-for="character in data" :key="character.slug">
      <a :href="`/characters/${character.slug}`" :key="character.id">{{ character.name }}</a>
    </div>



  </template>
</template>


<style scoped></style>
