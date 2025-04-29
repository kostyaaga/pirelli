<script setup>

import Comment from "@/components/Comments.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay as SwiperAutoplay, Pagination as SwiperPagination, Navigation as SwiperNavigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import slide1 from '@/assets/image/slide1.jpg';
import slide2 from '@/assets/image/slide2.jpg';
import slide3 from '@/assets/image/slide3.jpg';
import slide4 from '@/assets/image/slide4.jpg';

const slides = [
  { image: slide1, alt: 'Slide 1' },
  { image: slide2, alt: 'Slide 2' },
  { image: slide3, alt: 'Slide 3' },
  { image: slide4, alt: 'Slide 4' }
];

import slider1 from '@/assets/image/slide1.jpg'
import slider2 from '@/assets/image/slide2.jpg'
import slider3 from '@/assets/image/slide3.jpg'
import slider4 from '@/assets/image/slide4.jpg'
import slider5 from '@/assets/image/slide1.jpg'
import slider6 from '@/assets/image/slide2.jpg'
import slider7 from '@/assets/image/slide3.jpg'
import slider8 from '@/assets/image/slide4.jpg'

const images = [
  { image: slider1, alt: 'Slide 1' },
  { image: slider2, alt: 'Slide 2' },
  { image: slider3, alt: 'Slide 3' },
  { image: slider4, alt: 'Slide 4' },
  { image: slider5, alt: 'Slide 5' },
  { image: slider6, alt: 'Slide 6' },
  { image: slider7, alt: 'Slide 7' },
  { image: slider8, alt: 'Slide 8' },
]

</script>

<template>
  <div class="mt-20 max-w-[1320px] mx-auto my-0">
    <h1 class="font-bold text-5xl text-center">Блюда этой недели</h1>
    <div class="max-w-4xl mx-auto my-8">
      <swiper
          :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
          :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }"
          :slides-per-view="1"
          :space-between="30"
          :loop="true"
          :pagination="{
          el: '#custom-pagination',
          clickable: true
        }"
          :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
          class="rounded-xl overflow-hidden shadow-xl"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <img
              :src="slide.image"
              :alt="`Slide ${index + 1}`"
              class="w-full h-full object-cover"
          />
        </swiper-slide>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </swiper>
    </div>
    <div class="flex justify-center mt-6" id="custom-pagination"></div>
  </div>
  <div class="mt-30 max-w-[1320px] mx-auto my-0">
    <h1 class="font-bold text-5xl text-start">Поплуярные авторы</h1>
    <div class="flex justify-between mt-20">
      <router-link to="/">
        <img class="rounded-full" src="../assets/image/avatar.png" alt="">
        <p class="text-center text-xl mt-5">Иван петров</p>
      </router-link>
      <router-link to="/">
        <img class="rounded-full" src="../assets/image/avatar.png" alt="">
        <p class="text-center text-xl mt-5">Иван петров</p>
      </router-link>
      <router-link to="/">
        <img class="rounded-full" src="../assets/image/avatar.png" alt="">
        <p class="text-center text-xl mt-5">Иван петров</p>
      </router-link>
      <router-link to="/">
        <img class="rounded-full" src="../assets/image/avatar.png" alt="">
        <p class="text-center text-xl mt-5">Иван петров</p>
      </router-link>
    </div>
  </div>
  <div class="mt-30 max-w-[1320px] mx-auto my-0">
    <h1 class="font-bold text-5xl text-start">Топ блюд</h1>
    <div class="container mx-auto my-10 relative flex items-center gap-4">
      <div class="top-prev cursor-pointer bg-white p-3 rounded-full shadow-md hover:bg-gray-200">
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      <Swiper
          :modules="[SwiperNavigation]"
          :slides-per-view="4"
          :space-between="20"
          :loop="false"
          :navigation="{
      nextEl: '.top-next',
      prevEl: '.top-prev'
    }"
          class="w-full"
      >
        <SwiperSlide v-for="(img, index) in images" :key="index">
          <img :src="img.image" :alt="img.alt" class="rounded-lg shadow-lg w-auto h-auto" />
        </SwiperSlide>
      </Swiper>

      <div class="top-next cursor-pointer bg-white p-3 rounded-full shadow-md hover:bg-gray-200">
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
  <div class="mt-30 max-w-[1320px] mx-auto my-0">
    <h1 class="font-bold text-5xl text-start">Коменатрии о сайте</h1>
    <Comment/>
  </div>

  <div class="mt-30 max-w-[1320px] mx-auto my-0">
    <h1 class="font-bold text-5xl text-start">О нашем сайте</h1>
    <div class="my-10">
      <div class="flex gap-3">
        <div class="">
          <p class="w-[426px]" >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aspernatur doloribus ducimus eius est, et facilis fuga maiores necessitatibus neque non optio quae quasi quisquam quo, similique sunt ut.</p>
          <img src="../assets/image/arrow1.svg" alt="">
        </div>
        <div class="">
          <img class="w-[426px] h-auto mt-30" src="../assets/image/slide1.jpg" alt="">
        </div>
        <div class="">
          <p class="w-[426px]" >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aspernatur doloribus ducimus eius est, et facilis fuga maiores necessitatibus neque non optio quae quasi quisquam quo, similique sunt ut.</p>
          <img src="../assets/image/arrow3.svg" alt="">
        </div>
      </div>
      <div class="flex gap-3 my-10 content-center">
        <div class="">
          <img class="w-[426px] w-[426px] mt-30" src="../assets/image/slide2.jpg" alt="">
        </div>
        <div class="">
          <p class="w-[426px]" >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aspernatur doloribus ducimus eius est, et facilis fuga maiores necessitatibus neque non optio quae quasi quisquam quo, similique sunt ut.</p>
          <img src="../assets/image/arrow2.svg" alt="">
        </div>
        <div class="">
          <img class="w-[426px]" src="../assets/image/slide3.jpg" alt="">
        </div>
      </div>
    </div>

  </div>
</template>

<style>
#custom-pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.swiper-pagination-bullet {
  width: 14px;
  height: 14px;
  background-color: #ccc;
  border-radius: 50%;
  opacity: 1;
  transition: background-color 0.3s;
}

.swiper-pagination-bullet-active {
  background-color: #73675D;
}
</style>


