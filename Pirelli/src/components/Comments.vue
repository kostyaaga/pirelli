<script setup>
import Comment from "@/components/Comment.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const comments = ref([]);

const fetchComments = async () => {
  try {
    const { data } = await axios.get('https://fbe52826bb0b11d9.mokky.dev/reviews');
    comments.value = data;
  } catch (error) {
    console.error("Ошибка загрузки:", error);
  }
};

onMounted(fetchComments);
</script>

<template>
  <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1320px] mx-auto justify-items-center">
    <Comment
        v-for="comment in comments"
        :key="comment.id"
        :name="comment.name"
        :grade="Number(comment.grade)"
        :text="comment.text"
    />


  </div>
</template>