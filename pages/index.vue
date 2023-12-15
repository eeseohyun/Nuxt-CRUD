<template>
  <div>
    <div class="w-full p-10 flex justify-center">
      <h2 class="font-bold text-xl">공지사항</h2>
      <hr class="my-3" />
    </div>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="search" placeholder="검색" />
    </div>
    <UTable :rows="filteredRows" :columns="columns" :loading="pending" />
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="people.length"
      />
    </div>
  </div>
</template>

<script setup>
import { getPosts } from "../server/api/.js";
import { ref } from "vue";

const posts = ref([]);
const fetchPosts = () => {
  posts.value = getPosts();
};
fetchPosts();
const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "이름" },
  { key: "title", label: "제목" },
  { key: "role", label: "관리자" },
  { key: "updatedDate", label: "게시일" },
];
const page = ref(1);
const pageCount = 5;
const search = ref("");
// const { data: boards, pending } = await useFetch(
//   "http://localhost:5000/boards"
// );

const rows = computed(() => {
  return posts.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const filteredRows = computed(() => {
  if (!search.value) {
    return rows;
  }

  return posts.filter((post) => {
    return Object.values(post).some((value) => {
      return String(value).toLowerCase().includes(search.value.toLowerCase());
    });
  });
});
</script>
