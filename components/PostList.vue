<template>
  <div class="post-list">
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            id
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            제목
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            게시일
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            분류태그
          </th>
        </tr>
      </thead>
      <tbody>
        <Post
          v-for="post in paginatedPosts"
          :key="post.id"
          :post="post"
          :isLoading="isLoading"
        />
      </tbody>
    </table>
    <Pagination :goToPrev="goToPrev()" :goToNext="goToNext()" />
  </div>
</template>
<script setup>
import Post from './Post.vue';
import Pagination from './Pagination.vue';
import { ref, onMounted } from 'vue';

const currentPage = ref(1);
const perPage = 10;
const posts = ref([]);
const isLoading = ref(false);
const totalPages = computed(() => Math.ceil(posts.value.length / perPage));
const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage;
  const endIndex = currentPage.value * perPage;
  return posts.value.slice(startIndex, endIndex);
});
const fetchPosts = async () => {
  try {
    isLoading.value = true;
    const response = await fetch('http://localhost:3000/posts');
    if (!response.ok) {
      throw Error('⚠️ 데이터를 가져올 수 없습니다!');
    }
    posts.value = await response.json();
    isLoading.value = false;
  } catch (error) {
    console.error('데이터 로딩 중 에러:', error);
    isLoading.value = false;
  }
};
const goToPrev = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToNext = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
onMounted(fetchPosts);
</script>
<style></style>
