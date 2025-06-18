<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const loading = ref(false)
const error = ref(null)

const fetchUsers = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch('https://fbe52826bb0b11d9.mokky.dev/users')
    if (!res.ok) throw new Error(`Статус ошибки: ${res.status}`)
    users.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const deleteUser = async (id) => {
  const confirmed = confirm('Вы уверены, что хотите удалить этого пользователя?')
  if (!confirmed) return

  try {
    const res = await fetch(`https://fbe52826bb0b11d9.mokky.dev/users/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error(`Ошибка при удалении: ${res.statusText}`)
    users.value = users.value.filter((user) => user.id !== id)
  } catch (e) {
    alert(`Не удалось удалить пользователя: ${e.message}`)
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div class="min-h-screen bg-[#f2e8e4] py-10 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-semibold text-gray-800 mb-6">Список пользователей</h1>

      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div
            v-for="user in users"
            :key="user.id"
            class="relative rounded-2xl shadow-md bg-[#5a514a] text-white overflow-hidden flex flex-col justify-between"
        >
          <button
              @click="deleteUser(user.id)"
              class="absolute top-3 right-3 bg-red-500 hover:bg-red-700 transition text-white text-sm p-1 rounded-full p-3"
              title="Удалить пользователя"
          >
            Удалить пользователя
          </button>

          <div class="p-5">
            <h2 class="text-xl font-bold mb-1">{{ user.login }}</h2>
            <p class="text-[#ffe082] text-sm font-semibold mb-2">{{ user.FIO }}</p>
            <p class="text-sm text-gray-200 mb-4">{{ user.email }}</p>
          </div>
          <div class="p-5 pt-0 text-sm text-gray-300">
            <span class="inline-block bg-[#3c3530] px-3 py-1 rounded-full mr-2">ID: {{ user.id }}</span>
          </div>
        </div>
      </div>

      <div v-if="loading" class="text-center mt-10 text-gray-600">
        Загрузка...
      </div>
      <div v-if="error" class="text-center mt-10 text-red-500">
        Ошибка: {{ error }}
      </div>
    </div>
  </div>
</template>