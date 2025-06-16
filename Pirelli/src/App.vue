<script setup>

import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer.vue";

import { ref, provide } from 'vue';

const authToken = ref(localStorage.getItem('authToken') || null);
const userRole = ref(localStorage.getItem('userRole') || null);

const setAuthToken = (token, role = null) => {
  authToken.value = token;
  userRole.value = role;

  if (token) {
    localStorage.setItem('authToken', token);
    if (role !== null) localStorage.setItem('userRole', role);
  } else {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  }
};

provide('auth', {
  token: authToken,
  setToken: setAuthToken,
  isAuthenticated: () => !!authToken.value,
  role: userRole,
  isAdmin: () => userRole.value === "1",
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
