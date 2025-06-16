import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/components/Main.vue'
import Register from "@/components/Register.vue";
import Login from "@/components/Login.vue";
import Profile from "@/components/Profile.vue";
import Lists from "@/components/Lists.vue";
import DishDetail from "@/components/DishDetail.vue"
import ProfileEdit from "@/components/ProfileEdit.vue";
import DishSave from "@/components/DishSave.vue";
import ListUsers from "@/components/ListUsers.vue";

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
    {
        path: '/profile/edit',
        name: 'ProfileEdit',
        component: ProfileEdit
    },
    {
        path: '/save',
        name: 'DishSave',
        component: DishSave,
    },
    {
        path: '/list_users',
        name: 'ListUsers',
        component: ListUsers,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router