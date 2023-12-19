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
        <div v-for="post in posts" :key="post.id">
          <Post :post="post" />
        </div>
        <tr>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">Admin</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">Jan 21, 2020</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">43</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span
              class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
            >
              <span
                aria-hidden
                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              ></span>
              <span class="relative">BE</span>
            </span>
          </td>
        </tr>
        <tr>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">Editor</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">Jan 01, 2020</p>
          </td>

          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">77</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span
              class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
            >
              <span
                aria-hidden
                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              ></span>
              <span class="relative">FE</span>
            </span>
          </td>
        </tr>
        <tr>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">Editor</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">Jan 10, 2020</p>
          </td>

          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">64</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span
              class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight"
            >
              <span
                aria-hidden
                class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
              ></span>
              <span class="relative">디자인</span>
            </span>
          </td>
        </tr>
        <tr>
          <td class="px-5 py-5 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">Admin</p>
          </td>
          <td class="px-5 py-5 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">Jan 18, 2020</p>
          </td>
          <td class="px-5 py-5 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">70</p>
          </td>
          <td class="px-5 py-5 bg-white text-sm">
            <span
              class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
            >
              <span
                aria-hidden
                class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
              ></span>
              <span class="relative">기획</span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination />
  </div>
</template>
<script setup>
import Post from './Post.vue';

const posts = ref([]);
</script>
<style></style>
