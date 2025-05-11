<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDish = (id) => {
  router.push({ name: 'DishDetail', params: { id } })
}

defineProps({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  time: { type: Number, required: true },
  grade: { type: Number, required: true },
  ingredients: { type: Number, required: true },
  calories: { type: Number, required: true },
  proteins: { type: Number, required: true },
  fats: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  ingredient: { type: Array, required: true },
})

const isExpandedNutrition = ref(false);
const isExpandedIngredients = ref(false);

function toggleNutritionDetails() {
  isExpandedNutrition.value = !isExpandedNutrition.value;
}

function toggleIngredientsDetails() {
  isExpandedIngredients.value = !isExpandedIngredients.value;
}
</script>

<template>
  <div @click="goToDish(id)"  class="relative text-stone-50 bg-stone-500 rounded-[30px] overflow-hidden transition-all duration-500 hover:scale-[1.01]">
    <div class="flex">
      <div class="w-1/3 flex-shrink-0 overflow-hidden">
        <img
            :src="image"
            alt="Изображение рецепта"
            class="w-full h-full object-cover transition-all duration-700 hover:scale-110 hover:rotate-1"
        >
      </div>

      <div class="flex flex-col gap-4 p-6 w-2/3">
        <div class="space-y-2">
          <h3 class="text-3xl font-bold transition-all duration-300 hover:text-amber-300 hover:translate-x-1">{{ title }}</h3>
          <p class="text-2xl text-amber-200 transition-all duration-500 hover:translate-x-2">{{ author }}</p>
        </div>

        <p class="text-lg opacity-90 transition-all duration-300 hover:opacity-100">{{ description }}</p>

        <div class="mt-auto space-y-4">
          <div class="flex gap-8">
            <div class="flex items-center gap-2 transition-all duration-300 hover:scale-105">
              <img src="../assets/image/clock.svg" alt="Время" class="w-6 h-6 animate-pulse">
              <span>{{ time }} минут</span>
            </div>
            <div class="flex items-center gap-2 transition-all duration-300 hover:scale-105">
              <img src="../assets/image/star-white.svg" alt="Оценка" class="w-6 h-6 animate-bounce">
              <span>{{ grade }} оценка</span>
            </div>
          </div>

          <div class="flex gap-6">
            <button
                @click="toggleNutritionDetails"
                class="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 hover:bg-amber-500 hover:text-stone-900"
                :class="isExpandedNutrition ? 'bg-amber-500 text-stone-900 scale-105' : 'bg-stone-600'"
            >
              <img
                  src="../assets/image/Vector%201.svg"
                  alt="КБЖУ"
                  class="w-5 h-5 transition-all duration-700"
                  :class="{'rotate-180': isExpandedNutrition}"
              >
              <span>КБЖУ</span>
            </button>

            <button
                @click="toggleIngredientsDetails"
                class="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 hover:bg-amber-500 hover:text-stone-900"
                :class="isExpandedIngredients ? 'bg-amber-500 text-stone-900 scale-105' : 'bg-stone-600'"
            >
              <img
                  src="../assets/image/Vector%201.svg"
                  alt="Ингредиенты"
                  class="w-5 h-5 transition-all duration-500"
                  :class="{'rotate-45': isExpandedIngredients}"
              >
              <span>{{ ingredients }} ингредиентов</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <transition
        enter-active-class="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="opacity-0 -translate-y-10"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-5"
    >
      <div
          v-if="isExpandedNutrition"
          class="bg-stone-400/90 p-6 border-t border-stone-600"
      >
        <div class="grid grid-cols-4 gap-4 text-center">

          <div class="p-4 bg-stone-500/50 rounded-lg transition-all duration-500 hover:scale-105 hover:bg-amber-500/20 hover:shadow-lg">
            <p class="text-amber-300 font-bold animate-pulse">Калории</p>
            <p class="text-2xl font-mono">{{ calories }}</p>
          </div>

          <div class="p-4 bg-stone-500/50 rounded-lg transition-all duration-500 hover:scale-105 hover:bg-amber-500/20 hover:shadow-lg" style="transition-delay: 100ms">
            <p class="text-amber-300 font-bold animate-pulse">Белки</p>
            <p class="text-2xl font-mono">{{ proteins }}г</p>
          </div>

          <div class="p-4 bg-stone-500/50 rounded-lg transition-all duration-500 hover:scale-105 hover:bg-amber-500/20 hover:shadow-lg" style="transition-delay: 200ms">
            <p class="text-amber-300 font-bold animate-pulse">Жиры</p>
            <p class="text-2xl font-mono">{{ fats }}г</p>
          </div>

          <div class="p-4 bg-stone-500/50 rounded-lg transition-all duration-500 hover:scale-105 hover:bg-amber-500/20 hover:shadow-lg" style="transition-delay: 300ms">
            <p class="text-amber-300 font-bold animate-pulse">Углеводы</p>
            <p class="text-2xl font-mono">{{ carbohydrates }}г</p>
          </div>
        </div>
      </div>
    </transition>

    <transition
        enter-active-class="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="opacity-0 -translate-y-10"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-5"
    >
      <div
          v-if="isExpandedIngredients"
          class="bg-stone-400/90 p-6 border-t border-stone-600"
      >
        <h4 class="text-xl font-bold text-amber-300 mb-4">Ингредиенты:</h4>
        <ul class="grid grid-cols-2 gap-4">
          <li
              v-for="(item, index) in ingredient"
              :key="index"
              class="p-3 bg-stone-500/50 rounded-lg transition-all duration-300 hover:bg-amber-500/20 hover:translate-x-2"
              :style="`transition-delay: ${index * 50}ms`"
          >
            <p class="text-lg">{{ item }}</p>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>