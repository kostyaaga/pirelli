<script setup>

import {inject} from "vue";

const handleLogout = () => {
  localStorage.removeItem('authToken'); // Очищаем токен
  window.location.reload();
};


const { isAuthenticated } = inject('auth');

</script>

<template>
  <header class="bg-[#F3F4F6] shadow-md ">
    <nav class="max-w-[1320px] mx-auto my-0">
      <div class="flex items-center justify-between h-full p-8 items-center">
        <div class="flex gap-4 items-center">
          <router-link to="/">
            <img src="../assets/image/logo.svg" alt="">
          </router-link>
          <router-link to="/" class="text-xl">Pirelli</router-link>
        </div>
        <div class="flex gap-6 items-center">
          <router-link to="/lists">Список блюд</router-link>
          <a href="">Мои рецепты</a>
          <router-link to="/">Главная</router-link>
        </div>
        <div>
          <div v-if="!isAuthenticated()"  class="flex gap-6 items-center" >
            <router-link to="/register">Регистрация</router-link>
            <router-link to="/login">Вход</router-link>
          </div>
          <div v-else class="flex gap-6 items-center">
            <router-link to="/profile">Профиль</router-link>
            <a @click="handleLogout" class="cursor-pointer">Выйти</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
