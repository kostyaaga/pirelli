<script setup>
import List from "@/components/List.vue";
import {onMounted, reactive, ref, watch} from "vue";

const list = ref([]);
const filteredList = ref([]);
const isLoading = ref(true);
const error = ref(null);
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})
const isExpandedIngredients = ref(false);
const isExpandedRate = ref(false);
const whiteInput = ref('');
const blackInput = ref('');
const whiteArray = ref([]);
const blackArray = ref([]);
const resGrade = ref(null);

const fetchDishes = async () => {
  try {
    const response = await fetch("https://fbe52826bb0b11d9.mokky.dev/dishes");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    list.value = data;
    applyFilters();
  } catch(err) {
    console.error("Ошибка при загрузке:", err);
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

const applyFilters = () => {
  let result = [...list.value];

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    result = result.filter(item =>
        item.title?.toLowerCase()?.includes(query)
    );
  }

  const checkIngredients = (item, products) => {
    if (!item.ingredient) return false;

    if (Array.isArray(item.ingredient)) {
      return item.ingredient.some(ing => {
        const ingStr = String(ing).toLowerCase();
        return products.some(p => ingStr.includes(p.toLowerCase()));
      });
    }

    return false;
  };

  if (whiteArray.value.length > 0) {
    result = result.filter(item =>
        checkIngredients(item, whiteArray.value)
    );
  }

  if (blackArray.value.length > 0) {
    result = result.filter(item =>
        !checkIngredients(item, blackArray.value)
    );
  }

  if (resGrade.value !== null && resGrade.value !== undefined) {
    result = result.filter(item =>
        item.grade !== null &&
        item.grade !== undefined &&
        item.grade === resGrade.value
    );
  }

  if (filters.sortBy) {
    result.sort((a, b) => a[filters.sortBy]?.localeCompare(b[filters.sortBy] ?? ''));
  }

  filteredList.value = result;
};


const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value;
}

function filterIngredient(){
  if(isExpandedIngredients.value === true){
    isExpandedIngredients.value = false;
  }
  else{
    isExpandedIngredients.value = true;
    isExpandedRate.value = false;
  }
}

function filterRating(){
  if(isExpandedRate.value === true){
    isExpandedRate.value = false;
    resGrade.value = null;
  }
  else{
    isExpandedIngredients.value = false;
    isExpandedRate.value = true;
  }

}

function addProduct() {
  if (whiteInput.value !== "" ){
    whiteArray.value.push(whiteInput.value);
    whiteInput.value = ''
    applyFilters();
  }
  if (blackInput.value !== ""){
    blackArray.value.push(blackInput.value);
    blackInput.value = ''
    applyFilters();
  }

}

const removeProduct = (arrayName, index) => {
  if (arrayName === 'whiteArray') {
    whiteArray.value.splice(index, 1);
  } else if (arrayName === 'blackArray') {
    blackArray.value.splice(index, 1);
  }
  applyFilters();
};


watch(filters, () => {
  applyFilters();
}, { deep: true });

function filterGrade(grade){
  resGrade.value = grade
}

watch(resGrade, () => {
  applyFilters();
}, { deep: true });

onMounted(fetchDishes);
</script>

<template>
  <div class="flex justify-around items-start mt-10">
    <div>
      <div class="flex items-center gap-5 justify-center ">
        <div @click="filterIngredient" class="flex gap-5 cursor-pointer">
          <p>Ингридиенты</p>
          <img class="filter brightness-0 invert-[0%]" src="../../public/images/vector1.svg" alt="">
        </div>
        <div @click="filterRating" class="flex gap-5 cursor-pointer">
          <p>Оценки</p>
          <img class="filter brightness-0 invert-[0%]" src="../../public/images/vector1.svg" alt="">
        </div>
      </div>
      <div class="flex justify-center">
        <transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 -translate-x-10"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 translate-x-10"
        >
          <div v-if="isExpandedIngredients" class="bg-white p-5 mt-5 rounded-xl shadow-xl">
            <div class="flex gap-5 bg-white">
              <div class="flex gap-3 cursor-pointer flex-1">
                <input
                    v-model="whiteInput"
                    placeholder="Введите продукт"
                    class="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                >
                <button
                    @click="addProduct('whiteArray')"
                    class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Добавить
                </button>
              </div>

              <div class="flex gap-3 cursor-pointer flex-1">
                <input
                    v-model="blackInput"
                    placeholder="Введите продукт"
                    class="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                >
                <button
                    @click="addProduct('blackArray')"
                    class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Убрать
                </button>
              </div>
            </div>

            <div class="flex mt-10 justify-between text-xl space-x-8">
              <div class="flex-1 space-y-3">
                <transition-group
                    name="list"
                    tag="div"
                    class="space-y-3"
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 translate-y-4"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-200 ease-in absolute"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-4"
                    move-class="transition-all duration-500 ease-in-out"
                >
                  <div
                      v-for="(product, index) in whiteArray"
                      :key="'white-'+index"
                      class="flex items-center justify-between p-3 bg-orange-50 rounded-lg group relative"
                  >
                    <span class="transition-all duration-200 group-hover:text-orange-600">{{product}}</span>
                    <button
                        @click="removeProduct('whiteArray', index)"
                        class="p-1 rounded-full hover:bg-orange-100 transition-all duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 hover:text-red-500 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </transition-group>
              </div>

              <div class="flex-1 space-y-3">
                <transition-group
                    name="list"
                    tag="div"
                    class="space-y-3"
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 translate-y-4"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-200 ease-in absolute"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-4"
                    move-class="transition-all duration-500 ease-in-out"
                >
                  <div
                      v-for="(product, index) in blackArray"
                      :key="'black-'+index"
                      class="flex items-center justify-between p-3 bg-gray-100 rounded-lg group relative"
                  >
                    <span class="transition-all duration-200 group-hover:text-gray-700">{{product}}</span>
                    <button
                        @click="removeProduct('blackArray', index)"
                        class="p-1 rounded-full hover:bg-gray-200 transition-all duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 hover:text-red-500 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </transition-group>
              </div>
            </div>
          </div>
        </transition>

        <transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 scale-50"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-50"
        >
          <div v-if="isExpandedRate" class="bg-white p-5 mt-5 rounded-xl shadow-xl p-10">
            <p class="text-xl font-medium">Отсортировать блюда по оценке</p>
            <div class="flex items-center justify-center gap-5 my-3">
              <img v-if="resGrade <= 0" @click="filterGrade(1)" src="../../public/images/star.svg" alt="" class="w-10 cursor-pointer">
              <img v-if="resGrade >= 1" @click="filterGrade(1)" src="../../public/images/star-bold.svg" alt="" class="w-10 cursor-pointer">
              <img v-if="resGrade <= 1" @click="filterGrade(2)" src="../../public/images/star.svg" alt="" class="w-10 cursor-pointer">
              <img v-if="resGrade >= 2" @click="filterGrade(2)" src="../../public/images/star-bold.svg" alt="" class="w-10 cursor-pointer">
              <img v-if="resGrade <= 2" @click="filterGrade(3)" src="../../public/images/star.svg" alt="" class="w-10 cursor-pointer">
              <img v-if="resGrade >= 3" @click="filterGrade(3)" src="../../public/images/star-bold.svg" alt="" class="w-10 cursor-pointer">
              <img v-if="resGrade <= 3" @click="filterGrade(4)" src="../../public/images/star.svg" alt="" class="w-10 cursor-pointer">
              <img v-if="resGrade >= 4" @click="filterGrade(4)" src="../../public/images/star-bold.svg" alt="" class="w-10 cursor-pointer">
              <img v-if="resGrade <= 4" @click="filterGrade(5)" src="../../public/images/star.svg" alt="" class="w-10 cursor-pointer">
              <img v-if="resGrade === 5" @click="filterGrade(5)" src="../../public/images/star-bold.svg" alt="" class="w-10 cursor-pointer">
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="flex items-center border-b-2 border-black focus-within:border-orange-500 transition-colors duration-300">
      <input
          @input="onChangeSearchInput"
          type="text"
          placeholder="Поиск..."
          class="py-2 px-3 w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
      >
      <img src="../../public/images/search.svg" alt="" class="h-5 w-5 text-gray-400">
    </div>
  </div>
      <div v-if="isLoading">Загрузка...</div>
      <div v-else-if="error">Ошибка: {{ error }}</div>
      <div v-else class="grid grid-cols-2 gap-15 m-30">
      <List
          v-for="item in filteredList"
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


</template>

