<script setup>
import { inject, ref, onMounted, reactive } from 'vue'
import router from "@/router/index.js";

const { token } = inject('auth') || {}
const user = ref(null)
const isLoading = ref(false)
const errors = ref({})
const successMessage = ref('')

const form = reactive({
  login: '',
  email: '',
  FIO: '',
})

const isUploadingAvatar = ref(false)
const previewImage = ref('')

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

    form.login = user.value.login || ''
    form.email = user.value.email || ''
    form.FIO = user.value.FIO || ''
  } catch (e) {
    console.error(e)
  }
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    previewImage.value = e.target.result
  }
  reader.readAsDataURL(file)

  if (errors.value.avatar) {
    delete errors.value.avatar
  }
}

const validateForm = () => {
  errors.value = {}

  if (!form.login.trim()) {
    errors.value.login = 'Логин обязателен'
  }

  if (!form.email.trim()) {
    errors.value.email = 'Email обязателен'
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.value.email = 'Некорректный формат email'
  }

  if (!form.FIO.trim()) {
    errors.value.FIO = 'ФИО обязательно'
  }

  return Object.keys(errors.value).length === 0
}

const handleSave = async () => {
  if (!validateForm()) return

  isLoading.value = true
  successMessage.value = ''

  try {
    const res = await fetch('https://fbe52826bb0b11d9.mokky.dev/users/' + user.value.id, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        login: form.login,
        email: form.email,
        FIO: form.FIO,
      })
    })

    if (!res.ok) {
      throw new Error('Ошибка при сохранении данных')
    }

    successMessage.value = 'Профиль успешно обновлен!'

    const loginChanged = user.value.login !== form.login

    if (loginChanged) {
      try {
        const refreshRes = await fetch('https://fbe52826bb0b11d9.mokky.dev/refresh-token', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token?.value}`,
            'Content-Type': 'application/json'
          }
        })

        if (refreshRes.ok) {
          const refreshData = await refreshRes.json()
          localStorage.setItem('authToken', refreshData.token)
          // Обновляем токен в inject
          if (token) {
            token.value = refreshData.token
          }
        } else {
          throw new Error('Не удалось обновить токен')
        }
      } catch (e) {
        console.warn('Ошибка обновления токена:', e)
        successMessage.value = 'Профиль обновлен! Войдите заново с новым логином'
        setTimeout(() => {
          localStorage.removeItem('authToken')
          router.push('/login')
        }, 2000)
        return
      }
    }

    await fetchUser()

    setTimeout(() => {
      router.push('/profile')
    }, 1500)

  } catch (e) {
    console.error(e)
    errors.value.general = 'Произошла ошибка при сохранении данных'
  } finally {
    isLoading.value = false
  }
}

const handleCancel = () => {
  router.push('/profile')
}

onMounted(() => {
  if (!token.value) {
    router.push('/login')
  } else {
    fetchUser()
  }
})
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm mt-50">
    <div class="flex items-center mb-6">
      <button
          @click="handleCancel"
          class="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="text-xl font-semibold text-gray-800">Редактирование профиля</h1>
    </div>

    <div v-if="user" class="space-y-6">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Логин
          </label>
          <input
              v-model="form.login"
              type="text"
              :class="[
              'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent',
              errors.login ? 'border-red-500' : 'border-gray-300'
            ]"
              placeholder="Введите логин"
          >
          <p v-if="errors.login" class="text-red-500 text-sm mt-1">
            {{ errors.login }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
              v-model="form.email"
              type="email"
              :class="[
              'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent',
              errors.email ? 'border-red-500' : 'border-gray-300'
            ]"
              placeholder="Введите email"
          >
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            ФИО
          </label>
          <input
              v-model="form.FIO"
              type="text"
              :class="[
              'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent',
              errors.FIO ? 'border-red-500' : 'border-gray-300'
            ]"
              placeholder="Введите ФИО"
          >
          <p v-if="errors.FIO" class="text-red-500 text-sm mt-1">
            {{ errors.FIO }}
          </p>
        </div>
      </div>

      <div v-if="successMessage" class="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
        {{ successMessage }}
      </div>

      <div v-if="errors.general" class="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {{ errors.general }}
      </div>

      <div class="flex space-x-3 pt-4">
        <button
            @click="handleSave"
            :disabled="isLoading || isUploadingAvatar"
            :class="[
            'flex-1 py-3 px-4 rounded-lg font-medium transition-colors',
            isLoading || isUploadingAvatar
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-amber-500 text-white hover:bg-amber-600'
          ]"
        >
          <span v-if="isLoading">Сохранение...</span>
          <span v-else-if="isUploadingAvatar">Загрузка аватара...</span>
          <span v-else>Сохранить</span>
        </button>

        <button
            @click="handleCancel"
            :disabled="isLoading || isUploadingAvatar"
            class="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Отмена
        </button>
      </div>
    </div>

    <div v-else class="text-center py-8 text-gray-500">
      Загрузка данных пользователя...
    </div>
  </div>
</template>