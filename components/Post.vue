<template>
  <div v-if="isLoading"><Loader /></div>
  <tr :key="post.id">
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">{{ post.id }}</p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p
        role="button"
        class="text-gray-900 whitespace-no-wrap"
        @click="moveToDetailPage(post.id)"
      >
        {{ post.title }}
      </p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">{{ post.updatedDate }}</p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <div v-if="post?.tags === 'BE'">
        <span
          class="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight"
        >
          <span
            aria-hidden
            class="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
          ></span>
          <span class="relative">{{ post.tags }}</span>
        </span>
      </div>
      <div v-if="post?.tags === 'FE'">
        <span
          class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden
            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span class="relative">{{ post.tags }}</span>
        </span>
      </div>
      <div v-if="post?.tags === 'design'">
        <span
          class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight"
        >
          <span
            aria-hidden
            class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
          ></span>
          <span class="relative">{{ post.tags }}</span>
        </span>
      </div>
      <div v-if="post?.tags === 'plan'">
        <span
          class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        >
          <span
            aria-hidden
            class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span class="relative">{{ post.tags }}</span>
        </span>
      </div>
      <div v-if="post?.tags === 'all'">
        <span
          class="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight"
        >
          <span
            aria-hidden
            class="absolute inset-0 bg-gray-200 opacity-50 rounded-full"
          ></span>
          <span class="relative">{{ post.tags }}</span>
        </span>
      </div>
    </td>
  </tr>
</template>
<script setup>
import { defineProps } from 'vue';
import Loader from './Loader.vue';
const { post, isLoading } = defineProps(['post', 'isLoading']);

const moveToDetailPage = (id) => {
  navigateTo('/boards/' + id);
};
</script>
<style></style>
