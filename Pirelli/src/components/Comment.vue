<script setup>
import filledStar from '@/assets/image/star.svg'
import emptyStar  from '@/assets/image/star-bold.svg'
defineProps({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    default: 0,
    validator: value => {
      return value >= 0 && value <= 5;
    }
  },
});


</script>

<template>
  <div class="w-sm h-xs bg-[#A69992] rounded-xl p-4 ">
    <div class=" flex items-center">
      <img class=" rounded-full" src="../assets/image/mini-avatar.png" alt="">
      <h1 class="ml-3 text-xl text-black">{{ name }}</h1>
    </div>
    <div class="flex">
      <img
          v-for="n in 5"
          :key="n"
          :src="n <= grade ? emptyStar : filledStar"
          alt="звезда"
          class="w-8 h-8 my-3"
      />
      {{grade}}
    </div>
    <p class="w-full truncate whitespace-nowrap overflow-hidden text-black">
      {{ text }}
    </p>
  </div>
</template>
