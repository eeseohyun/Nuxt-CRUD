<template>
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
        v-model="searchText"
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
  <PostList :searchText="searchText" :totalPages="totalPages" />
</template>
<script setup>
import PostList from '~/components/PostList.vue';
import { ref } from 'vue';

const searchText = ref('');
const error = ref(null);
const totalPages = ref([]);

const load = async () => {
  try {
    let response = await fetch('http://localhost:3000/boards', {
      method: 'GET',
    });
    if (!response.ok) {
      throw Error('⚠️ 데이터를 읽어올 수 없습니다!');
    }
    totalPages.value = await response.json();
  } catch (err) {
    error.value = err.message;
    console.error(err);
  }
};
load();
const moveToCreatePage = () => {
  return navigateTo('/boards/create');
};
</script>
<style></style>
