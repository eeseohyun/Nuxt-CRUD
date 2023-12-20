<script setup>
import PostList from "~/components/PostList.vue";
import Loader from "~/components/Loader.vue";

const posts = ref([]);
const error = ref(null);
let isLoading = false;
const load = async () => {
  try {
    isLoading = true;
    let response = await useFetch("http://localhost:3000/posts");
    if (!response.ok) {
      throw Error("⚠️ 데이터를 읽어올 수 없습니다!");
    }
    posts.value = await response.json();
    isLoading = false;
  } catch (err) {
    error.value = err.message;
  }
};
load();
</script>
<template>
  <div class="p-5 border-lime-400 border-2">
    <div v-if="error" class="flex justify-center">{{ error }}</div>
    <div v-if="posts.length">
      <PostList :posts="posts" />
    </div>
    <div v-if="isLoading" class="flex justify-center"><Loader /></div>
  </div>
</template>

<style></style>
