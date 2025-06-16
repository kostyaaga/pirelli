<script setup>
import { ref } from 'vue';
import router from "@/router/index.js";

const showPassword = ref(false);
const showPassword1 = ref(false);

const formData = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const validateForm = () => {
  if (!formData.value.email) {
    status.value = 'Пожалуйста, введите email';
    return false;
  }

  if (!formData.value.password && formData.value.confirmPassword) {
    status.value = 'Пожалуйста, введите пароли';
    return false;
  }


  if (formData.value.password.length < 6) {
    status.value = 'Пароль должен содержать минимум 6 символов';
    return false;
  }

  if (!/[a-zA-Z]/.test(formData.value.password)) {
    status.value = 'Пароль должен содержать латинские буквы';
    return false;
  }

  if (!/[0-9]/.test(formData.value.password)) {
    status.value = 'Пароль должен содержать цифры';
    return false;
  }

  if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(formData.value.login)){
    status.value = 'Логин должен содержат только латиницу и цифры';
    return false;
  }

  return true;
};

const status = ref('');
const isLoading = ref(false);
const responseData = ref(null);

async function handleSubmit() {
  if (!validateForm()) return;
  if (formData.value.password !== formData.value.confirmPassword) {
    status.value = 'Пароли не совпадают!';
    return;
  }

  isLoading.value = true;
  status.value = '';

  try {
    const res = await fetch("https://fbe52826bb0b11d9.mokky.dev/register", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: formData.value.login,
        FIO: formData.value.FIO,
        email: formData.value.email,
        password: formData.value.password,
        avatar: "",
        role: "",
      })
    });

    if (res.ok) {
      status.value = 'Успешная регистрация!';
      responseData.value = await res.json();
      router.push('/login')
    } else {
      status.value = 'Ошибка регистрации';
    }
  } catch (error) {
    status.value = 'Сетевая ошибка';
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center mt-20 gap-8">
    <h1 class="text-3xl font-bold">Регистрация</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col justify-center gap-5 w-full max-w-md">
      <input
          v-model="formData.login"
          class="w-full p-2 border rounded pr-10"
          type="text"
          placeholder="Логин"
          required
      >
      <input
          v-model="formData.FIO"
          class="w-full p-2 border rounded pr-10"
          type="text"
          placeholder="Полное имя"
          required
      >

      <input
          v-model="formData.email"
          class="w-full p-2 border rounded pr-10"
          type="email"
          placeholder="Email"
          required
      >

      <div class="relative">
        <input
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Пароль"
            class="w-full p-2 border rounded pr-10"
            required
            minlength="6"
        />
        <button
            @click.prevent="showPassword = !showPassword"
            class="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            type="button"
        >
          <span v-if="showPassword"><img src="../../public/images/eye.svg" alt=""></span>
          <span v-else><img src="../../public/images/eye-slash.svg" alt=""></span>
        </button>
      </div>

      <div class="relative">
        <input
            v-model="formData.confirmPassword"
            :type="showPassword1 ? 'text' : 'password'"
            placeholder="Повторите пароль"
            class="w-full p-2 border rounded pr-10"
            required
        />
        <button
            @click.prevent="showPassword1 = !showPassword1"
            class="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            type="button"
        >
          <span v-if="showPassword1"><img src="../../public/images/eye.svg" alt=""></span>
          <span v-else><img src="../../public/images/eye-slash.svg" alt=""></span>
        </button>
      </div>

      <div v-if="status"
           :class="status.includes('Успешная') ? 'text-green-600' : 'text-red-600'"
           class="text-center">
        {{ status }}
      </div>

      <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-amber-800
               hover:from-amber-500 hover:to-amber-700 text-amber-50 font-medium
               transition-all duration-300 shadow-md hover:shadow-lg
               border border-amber-600 hover:border-amber-700
               active:scale-95 active:shadow-inner
               focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isLoading">Загрузка...</span>
        <span v-else>Зарегистрироваться</span>
      </button>
    </form>
  </div>
</template>