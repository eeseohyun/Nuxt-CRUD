<template>
  <div>
    <nav class="flex items-center flex-wrap bg-lime-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <NuxtLink to="/"
          ><span class="font-semibold text-xl">Idevel</span></NuxtLink
        >
      </div>
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <NuxtLink to="/boards"><span class="text-md">공지사항</span></NuxtLink>
      </div>
    </nav>
    <slot></slot>
  </div>
</template>
<script setup></script>
<style></style>
