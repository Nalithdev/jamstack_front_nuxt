<script setup lang="ts">
import {forEach} from "@csstools/css-parser-algorithms";
import type {BackCharactersResponse, CharactersResponse} from "~/models/character.starpi";


let page = ref(1)
let MaxPage = ref(2)
let race = ref()
let nation = ref()
let tags = ref(new Set())

const {find} = useStrapi()
const {data, pending, error} = useAsyncData('characters', () => {
  return find<CharactersResponse>('characters', {
    populate: '*',
    pagination:{
      page: page.value,
      pageSize: MaxPage.value,

    },
    filters:{
      race:{
        $eqi: race.value
      },
      nation:{
        name: {
          $eqi: nation.value
        }
      }
    }
  })
}, {
  watch: [page ,race , nation]
})



function fetchByTag(tag: string, type: string) {
  if (type == 'race'){
    race.value = tag
  }
  if (type == 'nation'){
    nation.value = tag
  }
}
console.log(tags)


onMounted(() => {
  if(data.value){
    data.value.data.forEach((value) => {
      tags.value.add(value.race)
    })

  }
})


</script>
<template>


  <template v-if="pending">
    ça charge
  </template>
  <template v-else>
    <nav   class="tag">
      <p v-for="tag in tags" v-on:click="fetchByTag(tag, 'race')"> {{tag}}</p>
    </nav>
    <p>Bonjour</p>

    <div  class="card">
      <a v-for="character in data?.data" :key="character.slug" :href="`/characters/${character.slug}`"><div><img v-if="character.image != null" :src="character.image.formats.small.url" alt="">{{ character.name }}</div></a>
    </div>

    <button v-for="pages in data?.meta.pagination.pageCount"  v-on:click="page = pages">{{pages}}</button>



  </template>
</template>


<style scoped>
.tag{
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
}
.card {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: fit-content;
  gap: 10px;
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
}
button{
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
}
</style>
