
<template>
  <div>
   <div>
       <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
       <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create new account</h2>
       <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link :to="{name: 'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500">login to your account?</router-link>
        </p>
     </div>
     <form class="mt-8 space-y-6" @submit.prevent="register">
      
      <Toast :message="message" :type="toast" />
       <div class="-space-y-px rounded-md shadow-sm">
        <div>
           <label for="name" class="sr-only">Full name</label>
           <input v-model="user.name" id="name" name="name" type="text" autocomplete="name"  
            :class="{'bg-red-50 border-red-400 focus:ring-red-500 focus:border-red-500 text-gray-700': errors.name}"
           class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Full name" />
           <div class="mb-3 mt-2 text-red-700" v-if="errors.name">
              <p class="ml-1 text-xs" v-for="(err, key) in errors.name" :key="key">{{err}}</p>
            </div>
         </div>
         <div>
           <label for="email-address" class="sr-only">Email address</label>
           <input v-model="user.email" id="email-address" name="email" type="email" autocomplete="email"  
            :class="{'bg-red-50 border-red-400 focus:ring-red-500 focus:border-red-500 text-gray-700': errors.email}"
           class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
           <div class="mb-3 mt-2 text-red-700" v-if="errors.email">
              <p class="ml-1 text-xs" v-for="(err, key) in errors.email" :key="key">{{err}}</p>
            </div>
         </div>
         <div>
           <label for="password" class="sr-only">Password</label>
           <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password"  
           :class="{'bg-red-50 border-red-400 focus:ring-red-500 focus:border-red-500 text-gray-700': errors.password}"
           class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
            <div class="mb-3 mt-2 text-red-700" v-if="errors.password">
              <p class="ml-1 text-xs" v-for="(err, key) in errors.password" :key="key">{{err}}</p>
            </div>
         </div>
         <div>
           <label for="password" class="sr-only">Password confirmations</label>
           <input v-model="user.password_confirmation" id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password-confirmations"  
           class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password confirmations" />
         </div>
       </div>
 
       <div>
         <Btn text="Register" :loading="loading" type="submit"/>
       </div>
     </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios'
import {useAuthStore} from '@/stores/auth'
import router from '@/router/index'
import Toast from '@/components/Toast.vue'
import Btn from '@/components/Button.vue'
const user = reactive({
  name: '' ,
  email: '' ,
  password: '' ,
  password_confirmation: ''
})
const errors = ref({})
const loading = ref(false)
const toast = ref('')
const message = ref(null)
const store = useAuthStore()

async function register() {
  loading.value = true
  try {
    const response = await axios.post('register', user)
    toast.value = 'success'
    message.value = 'Your registration completed successfully'
    store.setUser(response.data)
    loading.value = false
    router.push({ name: "Dashboard" })
  } catch (error) {
    loading.value = false
    errors.value = error.response.data.errors
    message.value = error.response.data.message
    toast.value = 'error'
  }
} 

</script>
