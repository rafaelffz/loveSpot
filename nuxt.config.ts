// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  devtools: { enabled: true },

  app: {
    head: {
      title: "LoveSpot | Surpreenda quem você ama!",
    },
  },

  css: ["primeicons/primeicons.css"],

  modules: [
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    "@nuxt/icon",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "vue-clerk/nuxt",
  ],

  typescript: {
    typeCheck: true,
  },

  primevue: {
    importTheme: { from: "./assets/css/preset.ts" },
  },
});
