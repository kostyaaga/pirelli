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
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
      <div class="lg:w-1/2">
        <img
            :src="dish.image"
            alt="Изображение рецепта"
            class="w-full h-96 object-cover rounded-xl shadow-lg transition-all duration-500 hover:scale-[1.02]"
        >
      </div>
      <div class="lg:w-1/2">
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ dish.title }}</h1>
          <p class="text-lg text-gray-600">Автор: {{ dish.author }}</p>
        </div>

        <div class="flex flex-col gap-4 mb-5">
          <div class="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <img src="../../public/images/clock.svg" alt="Время" class="w-6 h-6 animate-pulse filter brightness-0 invert-0 dark:brightness-100 dark:invert">
            <span>{{ dish.time }} минут</span>
          </div>
          <div class="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <img src="../../public/images/star-white.svg" alt="Оценка" class="w-6 h-6 filter brightness-0 invert-0 dark:brightness-100 dark:invert">
            <span>{{ dish.grade }} оценка</span>
          </div>
        </div>
        <p class="text-gray-700 leading-relaxed">{{ dish.description }}</p>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-md p-6 mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Ингредиенты</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
            v-for="(item, index) in dish.ingredient"
            :key="index"
            class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <span class="text-gray-700">{{ item }}</span>
          <label class="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                class="h-5 w-5 text-amber-500 rounded border-gray-300 focus:ring-amber-500 transition duration-150 ease-in-out"
            >
          </label>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Способ приготовления</h2>

      <div class="space-y-10">
        <div
            v-for="(step, index) in dish.steps"
            :key="index"
            class="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="flex items-center justify-center w-10 h-10 bg-amber-500 rounded-full mr-4">
                <span class="font-bold text-white text-lg">{{ index + 1 }}</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-800">Шаг {{ index + 1 }}</h3>
            </div>

            <div class="flex flex-col lg:flex-row gap-6">
              <div class="lg:w-1/2">
                <img
                    :src="`/images/dishes/${dish.id}/step-${index + 1}.webp`"
                    loading="lazy"
                    :alt="`Шаг ${index + 1}: ${step.description}`"
                    class="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                >
              </div>
              <div class="lg:w-1/2 flex items-center">
                <p class="text-gray-700 leading-relaxed text-lg">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>