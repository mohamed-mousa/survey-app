import axios from 'axios'
import {useAuthStore} from '@/stores/auth'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

api.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${useAuthStore().token}`
    config.headers['API_KEY'] = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    return config
})

export default api