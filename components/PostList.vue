<template>
  <div class="post-list">
    <div v-for="post in posts">
      <Post :post="post" />
    </div>
  </div>
</template>
<script>
import Post from './Post.vue';
export default {
  props: ['posts'],
};
</script>
<style></style>
