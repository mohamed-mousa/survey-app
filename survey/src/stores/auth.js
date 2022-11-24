import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router/index'

export const useAuthStore = defineStore('auth', () => { 

  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)

  function logoutUser() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.user = null
    this.token = null
  }

  function setUser(data) {
    const values = {name: data.user.name, email: data.user.email}
    
    localStorage.setItem('user', JSON.stringify(values))
    localStorage.setItem('token', data.token)

    this.user = JSON.parse(localStorage.getItem('user'))
    this.token = localStorage.getItem('token')

  }

  return { user, logoutUser, token, setUser }
})
