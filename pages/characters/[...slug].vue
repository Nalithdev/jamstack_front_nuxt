<script setup lang="ts">
import type {Character} from "~/models/character.starpi";

const {findOne} = useStrapi4()
const route = useRoute()

const {data: character, pending} = useAsyncData('character', () =>
    findOne<{ data: Character[] }>(`player/${route.params.slug}`)
)

</script>

<template>

  <pre>{{ character }}</pre>
</template>

<style scoped>

</style>
