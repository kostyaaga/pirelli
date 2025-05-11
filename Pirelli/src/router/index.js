import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/components/Main.vue'
import Register from "@/components/Register.vue";
import Login from "@/components/Login.vue";
import Profile from "@/components/Profile.vue";
import Lists from "@/components/Lists.vue";
import DishDetail from "@/components/DishDetail.vue"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Main
    },
    {
        path: '/lists',
        name: 'Lists',
        component: Lists
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
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/dish/:id',
        name: 'DishDetail',
        component: DishDetail,
        props: true
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router