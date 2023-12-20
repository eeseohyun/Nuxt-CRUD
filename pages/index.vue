<script setup>
import Loader from '~/components/Loader.vue';

const posts = ref([]);
const error = ref(null);
let isLoading = true;
</script>
<template>
  <div class="p-5 border-lime-400 border-2">
    <div v-if="isLoading" class="flex flex-col items-center justify-center">
      <span>준비중!</span><Loader />
    </div>
  </div>
</template>

<style></style>
