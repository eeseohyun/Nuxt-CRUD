<template>
  <div
    class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
  >
    <span class="text-xs xs:text-sm text-gray-900">
      {{ currentPage }} / {{ totalPages }}
    </span>
    <div class="inline-flex mt-2 xs:mt-0">
      <button
        @click="goToPrev"
        class="text-sm text-indigo-50 transition duration-150 hover:bg-lime-600 bg-lime-500 font-semibold py-2 px-4 rounded-l"
      >
        ﹤
      </button>
      &nbsp; &nbsp;
      <button
        @click="goToNext"
        class="text-sm text-indigo-50 transition duration-150 hover:bg-lime-600 bg-lime-500 font-semibold py-2 px-4 rounded-r"
      >
        ﹥
      </button>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
const { currentPage, totalPages } = defineProps(['currentPage', 'totalPages']);
const emit = defineEmits(['goToPrev', 'goToNext']);
</script>
<style></style>
