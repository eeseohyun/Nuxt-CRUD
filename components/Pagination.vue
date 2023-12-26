<template>
  <div
    class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
  >
    <span class="text-xs xs:text-sm text-gray-900">
      {{ currentPage }} / {{ totalPagesNum }}
    </span>
    <div class="inline-flex mt-2 xs:mt-0">
      <button
        @click="goToPrev"
        ::disabled="currentPage === 1"
        class="text-sm text-indigo-50 transition duration-150 hover:bg-lime-600 bg-lime-500 font-semibold py-2 px-4 rounded-l"
      >
        ﹤
      </button>
      &nbsp; &nbsp;
      <button
        @click="goToNext"
        :disabled="currentPage === totalPagesNum"
        class="text-sm text-indigo-50 transition duration-150 hover:bg-lime-600 bg-lime-500 font-semibold py-2 px-4 rounded-r"
      >
        ﹥
      </button>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
let currentPage = route.params.page;
const { totalPages } = defineProps(["total-pages"]);
const totalPagesNum = Math.ceil(totalPages / 10);

const goToPrev = () => {
  const newPage = +currentPage > 1 ? +currentPage - 1 : 1;
  return router.push({ params: { page: newPage } });
};

const goToNext = () => {
  const newPage =
    +currentPage <= +totalPagesNum - 1 ? +currentPage + 1 : +totalPagesNum;
  console.log(newPage);
  console.log(currentPage);
  console.log("totalPages", totalPagesNum);
  return router.push({ params: { page: newPage } });
};
</script>
<style></style>
