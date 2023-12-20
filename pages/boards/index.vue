<template>
  <div
    class="bg-gray-100 flex flex-col items-center justify-center h-screen px-2 py-4"
  >
    <div class="flex flex-col w-full lg:w-1/2 h-full bg-white px-9">
      <div class="w-auto flex justify-between items-center p-3">
        <h2 class="text-xl font-semibold">공지사항</h2>
        <button
          @click="moveToCreatePage"
          class="flex items-center bg-lime-500 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
        >
          <p class="text-white">글쓰기</p>
        </button>
      </div>
      <div class="w-full flex justify-center p-1 mb-4">
        <div class="relative w-full">
          <input
            type="text"
            class="w-full bg-white py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-black transition-colors duration-300"
          />
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <PostList :posts="posts" :isLoading="isLoading" />
    </div>
  </div>
</template>
<script setup>
import PostList from "../components/PostList.vue";
const posts = ref([]);
const error = ref(null);
let isLoading = false;
const load = async () => {
  try {
    isLoading = true;
    let response = await fetch("http://localhost:3000/posts", {
      method: "GET",
    });
    if (!response.ok) {
      throw Error("⚠️ 데이터를 읽어올 수 없습니다!");
    }
    isLoading = false;
    posts.value = await response.json();
  } catch (err) {
    error.value = err.message;
  }
};
load();
const moveToCreatePage = () => {
  navigateTo("/boards/create");
};
</script>
<style></style>
