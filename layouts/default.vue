<template>
  <Header />
  <div
    class="bg-gray-100 flex flex-col items-center justify-center min-h-full px-2 py-4"
  >
    <div class="flex flex-col w-full lg:w-1/2 h-full bg-white px-9 py-3">
      <slot />
    </div>
  </div>
</template>
<script setup>
import Header from "~/components/Header.vue";
</script>
<style></style>
