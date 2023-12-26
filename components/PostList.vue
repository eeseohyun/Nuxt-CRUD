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
        <Post v-for="(post, idx) in paginatedData" :post="post" :key="idx" />
      </tbody>
    </table>
  </div>
</template>
<script setup>
import Post from "./Post.vue";
import { ref, defineProps } from "vue";
import { useRoute } from "vue-router";

const { searchText } = defineProps(["searchText"]);

const route = useRoute();
const categories = ["id", "제목", "게시일", "분류태그"];
const pagination = ref({
  currentPage: route.params.page,
  searchText: searchText,
});
const paginatedData = ref([]);

const fetchData = async () => {
  try {
    const response = await fetch(
      `http://192.168.1.88:3000/boards?_sort=id&_order=desc&_page=${pagination.value.currentPage}&_limit=10`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    paginatedData.value = data;
  } catch (error) {
    console.error(error);
  }
};
fetchData();
</script>
<style></style>
