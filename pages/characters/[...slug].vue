<script setup lang="ts">
import type {Character} from "~/models/character.starpi";

const {findOne} = useStrapi4()
const route = useRoute()

const {data: character, pending} = useAsyncData('character', () =>
    findOne<{ data: Character[] }>(`characters/${route.params.slug}`, {
      populate:"*"
    })
)

</script>

<template>

  <h2>{{ character.data.name }}</h2>
  <p>Age : {{character.data.age}} ans</p>
  <p>Nation : {{character.data.nation.name}}</p>

  <img v-if="character.data.image != null" :src="character.data.image.formats.small.url" alt="">
</template>

<style scoped>

</style>
