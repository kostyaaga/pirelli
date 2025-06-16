<script setup>

import List from "@/components/List.vue";
import {inject, onMounted, ref} from "vue";
import router from "@/router/index.js";

const isLoading = ref(true);
const error = ref(null);
const list = ref([]);
const user = ref(null)
const { token } = inject('auth') || {}

const fetchDishes = async () => {
  try {
    const response = await fetch("https://fbe52826bb0b11d9.mokky.dev/dishes");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const savedIds = user.value?.saveDishes || [];
    list.value = data.filter(dish => savedIds.includes(dish.id));

  } catch(err) {
    console.error("Ошибка при загрузке:", err);
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}


const fetchUser = async () => {
  try {
    const res = await fetch('https://fbe52826bb0b11d9.mokky.dev/auth_me', {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        Accept: 'application/json'
      }
    })
    if (!res.ok) {
      throw new Error('Ошибка при получении пользователя')
    }
    user.value = await res.json()
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  if (!token.value) {
    router.push('/login')
  }
  else{
    fetchUser()
    fetchDishes()
  }
})
</script>

<template>
  <div v-if="user" class="space-y-6">
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error">Ошибка: {{ error }}</div>
    <div v-else class="grid grid-cols-2 gap-15 m-30">
      <List
          v-for="item in list"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :author="item.author"
          :description="item.description"
          :image="item.image"
          :time="item.time"
          :grade="item.grade"
          :ingredients="item.ingredients"
          :calories="item.calories"
          :proteins="item.proteins"
          :fats="item.fats"
          :carbohydrates="item.carbohydrates"
          :ingredient="item.ingredient"
      />
    </div>
  </div>
  <div v-else class="text-center py-8 text-gray-500">
    Пользователь не загружен
  </div>
</template>
