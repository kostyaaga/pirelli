<script setup>

import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer.vue";

import { ref, provide } from 'vue';

const authToken = ref(localStorage.getItem('authToken') || null);

const setAuthToken = (token) => {
  authToken.value = token;
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

provide('auth', {
  token: authToken,
  setToken: setAuthToken,
  isAuthenticated: () => !!authToken.value,
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
