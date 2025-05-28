<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const dish = ref({})
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch(`https://fbe52826bb0b11d9.mokky.dev/dishes/${route.params.id}`)
    if (!response.ok) throw new Error('Блюдо не найдено')
    dish.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Ошибка загрузки:', err)
  }
})
</script>

<template>
  <div class="flex justify-center gap-10 mt-20">
    <pre>{{ dish }}</pre>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <img v-if="dish.image" :src="dish.image" alt="Фото блюда" class="rounded-xl" />
    </div>
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl">{{ dish.title }}</h1>
      <h3 class="text-2xl"> {{dish.author}}</h3>
      <div class="flex gap-8">
        <div class="flex items-center gap-2 transition-all duration-300 hover:scale-105">
          <img src="../../public/images/clock.svg" alt="Время" class="w-6 h-6 animate-pulse filter brightness-0 invert-0 dark:brightness-100 dark:invert">
          <span>{{ dish.time }} минут</span>
        </div>
        <div class="flex items-center gap-2 transition-all duration-300 hover:scale-105">
          <img src="../../public/images/star-white.svg" alt="Оценка" class="w-6 h-6 filter brightness-0 invert-0 dark:brightness-100 dark:invert">
          <span>{{ dish.grade }} оценка</span>
        </div>
      </div>
      <p>{{dish.description}}</p>
    </div>
  </div>
  <div class="flex flex-col items-center mt-8 bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">

    <div class="w-full mt-6">
      <h3 class="text-lg font-medium text-gray-900 mb-3 pb-2 border-b border-gray-100 text-center">Список продуктов</h3>
      <div class="space-y-2">
        <div
            v-for="(item, index) in dish.ingredient"
            class="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors"
            :key="index"
        >
          <p class="text-gray-700">{{ item }}</p>
          <label class="inline-flex items-center">
            <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
          </label>
        </div>
      </div>
    </div>

  </div>
</template>