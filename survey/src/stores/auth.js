import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = reactive({
    date: {name: 'roger'},
    token: null
  })

  return { user }
})
