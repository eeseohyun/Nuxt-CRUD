<template>
  <div v-if="tags === 'BE'">
    <span
      class="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight"
    >
      <span
        aria-hidden
        class="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
      ></span>
      <span class="relative">{{ tags }}</span>
    </span>
  </div>
  <div v-if="tags === 'FE'">
    <span
      class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
    >
      <span
        aria-hidden
        class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
      ></span>
      <span class="relative">{{ tags }}</span>
    </span>
  </div>
  <div v-if="tags === 'design'">
    <span
      class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight"
    >
      <span
        aria-hidden
        class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
      ></span>
      <span class="relative">{{ tags }}</span>
    </span>
  </div>
  <div v-if="tags === 'plan'">
    <span
      class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
    >
      <span
        aria-hidden
        class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
      ></span>
      <span class="relative">{{ tags }}</span>
    </span>
  </div>
  <div v-if="tags === 'all'">
    <span
      class="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight"
    >
      <span
        aria-hidden
        class="absolute inset-0 bg-gray-200 opacity-50 rounded-full"
      ></span>
      <span class="relative">{{ tags }}</span>
    </span>
  </div>
</template>
<script setup>
defineProps({
  tags: String,
});
</script>
<style></style>
