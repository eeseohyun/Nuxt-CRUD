<template>
  <tr>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">{{ post.id }}</p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <NuxtLink to="`/boards/${post.id}`"
        ><p class="text-gray-900 whitespace-no-wrap">
          {{ post.title }}
        </p></NuxtLink
      >
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">{{ post.updatedDate }}</p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <span
        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
      >
        <span
          aria-hidden
          class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
        ></span>
        <span class="relative">Activo</span>
      </span>
    </td>
  </tr>
</template>
<script setup>
const post = ref({});
</script>
<style></style>
