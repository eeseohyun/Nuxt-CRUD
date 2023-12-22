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
        <Post v-for="post in paginatedData" :post="post" :key="post.id" />
      </tbody>
    </table>
    <Pagination
      :current-page="pagination.currentPage"
      :total-pages="Math.ceil(totalPages.length / limit)"
      @go-to-prev="goToPrev"
      @go-to-next="goToNext"
    />
  </div>
</template>
<script setup>
import Post from "./Post.vue";
import Pagination from "./Pagination.vue";
import { ref, onMounted } from "vue";
import { defineProps } from "vue";
const { searchText, totalPages } = defineProps(["searchText", "totalPages"]);

const categories = ["id", "제목", "게시일", "분류태그"];
const limit = 10;
const pagination = ref({
  currentPage: 1,
  limit: 10,
});
const paginatedData = ref([]);

const fetchData = async () => {
  const { data: responseData, pending } = await useFetch(
    "http://localhost:3000/boards",
    {
      method: "GET",
      query: {
        currentPage: pagination.value.currentPage,
        limit: pagination.value.limit,
      },
    }
  );

  if (!pending) {
    paginatedData.value = responseData;
  }
};
onMounted(() => fetchData());

const goToPrev = async () => {
  if (pagination.value.currentPage > 1) {
    pagination.value.currentPage -= 1;
    await fetchData();
  }
};

const goToNext = async () => {
  if (pagination.value.currentPage * limit < totalPages.length) {
    pagination.value.currentPage += 1;
    await fetchData();
  }
};
</script>
<style></style>
