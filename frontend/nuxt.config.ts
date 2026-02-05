export default defineNuxtConfig({
   css: ['~/assets/styles/main.css'],
  compatibilityDate: "2025-07-15",
  components: true,

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000/api",
      
    },
  },
});
