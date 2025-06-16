<script setup>
import { inject, ref, onMounted } from 'vue'
import router from "@/router/index.js";

const { token } = inject('auth') || {}
const user = ref(null)

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

const handleLogout = () => {
  localStorage.removeItem('authToken'); // Очищаем токен
  window.location.reload();
};

onMounted(() => {
  if (!token.value) {
    router.push('/login')
  }
  else{
    fetchUser()
  }
})
</script>

<template>
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm mt-50">
      <div v-if="user" class="space-y-6">
        <div class="flex items-center space-x-4">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">{{ user.login }}</h2>
            <p class="text-gray-500 text-sm">{{ user.email }}</p>
            <p class="text-gray-500 text-sm">{{ user.FIO }}</p>
            <p v-if="user.role === 1" class="text-gray-500 text-sm">Вы являетесь админом</p>
          </div>
        </div>

        <div class="border-t border-gray-100 pt-4 space-y-1">

        <router-link to="save">
          <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
          <span class="text-gray-700 font-medium">Сохраненные рецепты</span>
        </button>
        </router-link>

<!--          <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">-->
<!--            <span class="text-gray-700 font-medium">Стать автором</span>-->
<!--          </button>-->

<!--          <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">-->
<!--            <span class="text-gray-700 font-medium">Мои рецепты</span>-->
<!--          </button>-->


          <div class="border-t border-gray-100 my-2"></div>


          <button
              @click="handleLogout"
              class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-red-500 font-medium"
          >
            Выйти из аккаунта
          </button>
        </div>

        <div class="border-t border-gray-100 my-2"></div>

        <router-link to="/profile/edit">
          <button class="flex items-center space-x-2 mt-6 text-amber-600 hover:text-amber-700 transition-colors">
            <img src="/images/edit.svg" alt="Редактировать" class="w-5 h-5">
            <span class="font-medium">Редактировать профиль</span>
          </button>
        </router-link>

      </div>

      <div v-else class="text-center py-8 text-gray-500">
        Пользователь не загружен
      </div>
    </div>
</template>
