// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $development: undefined, $env: undefined, $meta: undefined, $production: undefined, $test: undefined,
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/strapi'
  ],
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v4'
  }
})
