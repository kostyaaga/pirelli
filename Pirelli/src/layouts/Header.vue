<script setup>

</script>

<template>
  <div class="bg-[#F3F4F6] shadow-md ">
    <div class="max-w-[1320px] mx-auto my-0">
      <div class="flex items-center justify-between h-full p-8 items-center">
        <div class="flex gap-4 items-center">
          <router-link to="/">
            <img src="../assets/image/logo.svg" alt="">
          </router-link>
          <router-link to="/" class="text-xl">Pirelli</router-link>
        </div>
        <div class="flex gap-6 items-center">
          <router-link to="/list">Список блюд</router-link>
          <a href="">Мои рецепты</a>
          <a href="">Главная</a>
        </div>
        <div class="flex gap-6 items-center">
          <a href="">
            <a href="">Регистрация</a>
            <a href="">Вход</a>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
