<script setup>
import { inject, ref} from 'vue';
import { useRouter } from 'vue-router';

const showPassword = ref(false);
const isLoading = ref(false);
const status = ref('');
const responseData = ref(null);
const router = useRouter();
const { setToken } = inject('auth');

const formData = ref({
  email: '',
  password: '',
});

const validateForm = () => {
  if (!formData.value.email) {
    status.value = 'Пожалуйста, введите email';
    return false;
  }

  if (!formData.value.password) {
    status.value = 'Пожалуйста, введите пароль';
    return false;
  }

  if (formData.value.password.length < 6) {
    status.value = 'Пароль должен содержать минимум 6 символов';
    return false;
  }

  return true;
};

const resetStatus = () => {
  status.value = '';
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  isLoading.value = true;
  resetStatus();

  try {
    const response = await fetch("https://fbe52826bb0b11d9.mokky.dev/auth", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.value.email,
        password: formData.value.password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    responseData.value = await response.json();
    status.value = 'Успешный вход!';

    if (responseData.value.token) {
      setToken(responseData.value.token);
      router.push('/');
    }

  } catch (error) {
    console.error('Ошибка при входе:', error);
    status.value = error.response?.data?.message || 'Неверный email или пароль';
  } finally {
    isLoading.value = false;
  }
};

</script>

<template>
  <div class="flex flex-col justify-center items-center mt-20 gap-8">
    <h1 class="text-3xl font-bold">Вход</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col justify-center gap-5 w-full max-w-md">
      <input
          v-model.trim="formData.email"
          @input="resetStatus"
          class="w-full p-2 border rounded pr-10"
          type="email"
          placeholder="Email"
          required
      >

      <div class="relative">
        <input
            v-model.trim="formData.password"
            @input="resetStatus"
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
            aria-label="Показать пароль"
        >
          <span v-if="showPassword"><img src="../../public/images/eye.svg" alt="Скрыть пароль"></span>
          <span v-else><img src="../../public/images/eye-slash.svg" alt="Показать пароль"></span>
        </button>
      </div>

      <div
          v-if="status"
          :class="{
          'text-green-600': status.includes('Успешный'),
          'text-red-600': !status.includes('Успешный')
        }"
          class="text-center"
      >
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
        <span v-else>Войти</span>
      </button>
    </form>
  </div>
</template>