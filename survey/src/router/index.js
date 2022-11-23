import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import Surveys from '@/views/Surveys.vue'
import authLayout from '@/components/authLayout.vue'
import guestLayout from '@/components/guestLayout.vue'
import {useAuthStore} from '@/stores/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: authLayout,
      meta: {requiresAuth: true},
      children: [
        {path: '/dashboard', name: 'Dashboard', component: Dashboard, },
        {path: '/surveys', name: 'Surveys', component: Surveys, }
      ]
    },
    {
      path: '/guest',
      component: guestLayout,
      meta: {notRequiresAuth: true},
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        },
       ]
    },
  ],

})

router.beforeEach((to, from , next) => {
  const store = useAuthStore()
  if (to.meta.requiresAuth && !store.token) {
    next({name: 'Login'})
  } else if (store.token && to.meta.notRequiresAuth) { 
    next({name: 'Dashboard'})
  } else { 
    next()
  }

})

export default router

