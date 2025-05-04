<script setup>
import List from "@/components/List.vue";
import { onMounted, ref } from "vue";

const list = ref([]);
const isLoading = ref(true);
const error = ref(null);

const fetchDishes = async () => {
  try {
    const response = await fetch("https://fbe52826bb0b11d9.mokky.dev/dishes");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    list.value = data;
  } catch(err) {
    console.error("Ошибка при загрузке:", err);
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchDishes);
</script>

<template>
  <div v-if="isLoading">Загрузка...</div>
  <div v-else-if="error">Ошибка: {{ error }}</div>
  <div v-else class="grid grid-cols-2 gap-15 m-30">
    <List
        v-for="item in list"
        :key="item.id"
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
</template>