<script setup>

import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer.vue";
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
