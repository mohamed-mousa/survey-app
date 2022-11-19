import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router/index'

export const useAuthStore = defineStore('auth', () => { 

  const user = reactive({ 
    data: {
      name: 'Mohamed Mousa',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
  })

  const token = ref(null)
  function logout() {
    this.token = null
    this.user.data = {}
    router.push({ name: "Login" })
  }

  return { user, logout, token, router }
})
