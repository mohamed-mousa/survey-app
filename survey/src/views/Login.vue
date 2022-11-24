
<template>
   <div>
    <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link :to="{name: 'Register'}" class="font-medium text-indigo-600 hover:text-indigo-500">create account</router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <Toast :message="message" :type="toast" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input v-model="user.email" id="email-address" name="email" type="email" autocomplete="email" required="" 
            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password" required="" 
            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input v-model="user.remember" id="remember" name="remember" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label for="remember" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
          </div>
        </div>

        <div>
          <Btn text="Login" :loading="loading" type="submit"/>
        </div>
      </form>
   </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import {useAuthStore} from '@/stores/auth'
import api from '@/axios'
import router from '@/router/index'
import Toast from '@/components/Toast.vue'
import Btn from '@/components/Button.vue'
const user = {
  name: '' ,
  email: '' ,
  remember: false,
}
const loading = ref(false)
const toast = ref('')
const message = ref(null)
const store = useAuthStore()

async function login() {
  loading.value = true
  try {
    const response = await api.post('login', user)
    toast.value = 'success'
    message.value = 'Your login completed successfully'
    store.setUser(response.data)
    loading.value = false
    router.push({ name: "Dashboard" })
  } catch (error) {
    loading.value = false
    message.value = error.response.data.message
    toast.value = 'error'
  }
} 
</script>
