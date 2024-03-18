<script setup lang="ts">
import {forEach} from "@csstools/css-parser-algorithms";
import type {CharactersResponse} from "~/models/character.starpi";

const {find} = useStrapi()
const {data, pending, error} = await useAsyncData('characters', async () => {
  return await find<CharactersResponse>('characters', {
    populate: '*'
  })
})
</script>


<template>

  <p>Bonjour</p>
  <pre>{{ data }}</pre>


</template>


<style scoped></style>
