<template>
  <div class="post-list">
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th
            v-for="(category, idx) in categories"
            :key="idx"
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            {{ category }}
          </th>
        </tr>
      </thead>
      <tbody>
        <Post
          v-for="post in paginatedPosts"
          :key="post.id"
          @goToPrev="goToPrev"
          @goToNext="goToNext"
        />
      </tbody>
    </table>
    <Pagination
      @currentPage="currentPage"
      :totalPages="totalPages"
      :paginatedPosts="paginatedPosts"
    />
  </div>
</template>
<script setup>
import Post from "./Post.vue";
import Pagination from "./Pagination.vue";
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
const props = defineProps(["fileteredPosts"]);
const { fileteredPosts } = toRefs(props);

const categories = ["id", "제목", "게시일", "분류태그"];
const emit = defineEmits(["goToPrev", "goToNext"]);
const currentPage = ref(1);
const perPage = 10;
const totalPages = computed(() =>
  Math.ceil(fileteredPosts.value.length / perPage)
);
const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage;
  const endIndex = currentPage.value * perPage;
  return fileteredPosts.value.slice(startIndex, endIndex);
});

const goToPrev = () => {
  if (currentPage > 1) {
    emit("update-currentPage", currentPage - 1);
  }
};

const goToNext = () => {
  if (currentPage < totalPages) {
    emit("update-currentPage", currentPage + 1);
  }
};
</script>
<style></style>
