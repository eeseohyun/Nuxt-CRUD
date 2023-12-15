<template>
  <div>
    <NuxtLayout>
      <nuxt-page />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { data: posts } = await useFetch("http://localhost:5000/boards");
</script>
