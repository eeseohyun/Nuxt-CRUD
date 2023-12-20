<template>
  <div class="post-list">
    <table class="min-w-full flex flex-col leading-normal">
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
    <Pagination :posts="posts" :currentPage="currentPage" :perPage="perPage" />
  </div>
</template>
<script setup>
import Post from "./Post.vue";
import Pagination from "./Pagination.vue";
import { defineProps } from "vue";

defineProps({
  posts: { type: Array, required: true },
  isLoading: { type: Boolean, required: true },
});
let currentPage = ref(1);
const perPage = 10;
const paginatedPosts = computed(() =>
  posts.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
);
</script>
<style></style>
