<script setup lang="ts">
import {forEach} from "@csstools/css-parser-algorithms";
import type {BackCharactersResponse, CharactersResponse} from "~/models/character.starpi";
import {computed} from "vue";


let page = ref(1)
let MaxPage = ref(2)
let race = ref()
let nation = ref()
let tags = ref(new Set())
let name = ref()
console.log(race.value)

const {find} = useStrapi()
const {data, pending, error} = useAsyncData('characters', () => {
  return find<CharactersResponse>('characters', {
    populate: '*',
    pagination:{
      page: page.value,
      pageSize: MaxPage.value,

    },
    filters:{
      name:{
        $contains: name.value

      },
      race:{
        $eqi: race.value
      },
      nation:{
        name: {
          $eqi: nation.value
        }
      }
    },
    sort: 'id:asc'
  })
}, {
  watch: [page ,race , nation, name]
})



function fetchByTag(tag: string, type: string) {
  console.log(tag , type)
  if (type == 'race'){
    race.value = tag
  }
  if (type == 'nation'){
    nation.value = undefined
  }
  if (tag == '' && type == ''){
    race.value = undefined

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
const updateTags = () => {
  if (data.value) {
    data.value.data.forEach(value => {
      tags.value.add(value.race);
    });
  }
};

watch(data, updateTags, {immediate: true});

</script>
<template>
  <div>
    <input v-model="name" type="text" placeholder="recherche par nom" class="input">
  </div>



  <template v-if="pending">
    ça charge
  </template>
  <template v-else>

    <nav class="tag">
      <p v-for="tag in tags" v-on:click="fetchByTag(tag, 'race')"> {{tag}}</p>
      <p v-on:click="fetchByTag('', '')"> stop filtre</p>
    </nav>
    <p>Bonjour</p>

    <div class="global" >
      <a class="card" v-for="character in data?.data" :key="character.slug" :href="`/characters/${character.slug}`"><div><h2>{{ character.name }}</h2><img v-if="character.image != null" :src="character.image.formats.small.url" alt=""></div></a>
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
.input{
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
}
.global{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
