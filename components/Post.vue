<template>
  <tr v-if="post" :key="post.id">
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
      <Banner :tags="post.tags" />
    </td>
  </tr>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps(["post"]);
const { post } = toRefs(props);

const moveToDetailPage = (postId) => {
  navigateTo(`/boards/${postId}`);
};
</script>
<style></style>
