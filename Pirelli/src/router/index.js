import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/components/Main.vue'
import List from '@/components/List.vue'
import Register from "@/components/Register.vue";
import Login from "@/components/Login.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Main
    },
    {
        path: '/list',
        name: 'List',
        component: List
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router