import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/components/Main.vue'
import List from '@/components/List.vue'

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router