<script setup>

</script>

<template>
  <footer class="bg-[#F3F4F6] shadow-md p-10">
    <div class="flex justify-between max-w-[1320px] mx-auto my-0">
      <div class="flex flex-col items-start justify-center">
        <p>У вас остались вопросы?</p>
        <div class="">
          <div class="">
            <input

                type="text"
                placeholder="Напишите нам"
                class=" w-50 p-2 rounded-md focus:outline-none border-0 pt-3"
            >

            <button
                class="m-3 px-5 py-2 bg-amber-600 text-black rounded-md hover:bg-amber-500 focus:outline-none cursor-pointer ">
              отправить
            </button>
          </div>
          <span class="block w-80 h-0.5 bg-black rounded-md"></span>
        </div>
      </div>
      <div class="flex gap-3 flex-col">
        <p class="font-bold">Информация</p>
        <p>Скидки</p>
        <p>Политика конфиденциальности</p>
        <p>FAQ</p>
      </div>
      <div class="flex gap-3 flex-col">
        <p class="font-bold">Контакты</p>
        <p>+79091234567</p>
        <p>+79091234567</p>
        <p>Pirelli@gmail.com</p>
      </div>
      <div class="flex gap-3 flex-col">
        <p class="font-bold">Соц сети</p>
        <a href="" class="flex gap-3">
          <img src="../assets/image/snapchat.svg" alt="">
          <p>Snapchat</p>
        </a>
        <a href="" class="flex gap-3">
          <img src="../assets/image/Plain.svg" alt="">
          <p>Telegram</p>
        </a>
        <a href="" class="flex gap-3">
          <img src="../assets/image/facebook.svg" alt="">
          <p>Facebook</p>
        </a>
      </div>
    </div>
  </footer>
</template>



