<script>
import PostList from '~/components/PostList.vue';
import Loader from '~/components/Loader.vue';
import Header from '~/components/Header.vue';

export default {
  setup() {
    const posts = ref([]);
    const error = ref(null);
    const load = async () => {
      try {
        let data = await axios.get('http://localhost:3000/posts');
        if (!data.ok) {
          throw Error('데이터를 읽어올 수 없습니다!');
        }
        posts.value = await data.json();
        console.log(posts.value);
        console.log(data);
      } catch (err) {
        error.value = err.message;
      }
    };
    load();
    return { posts, error };
  },
};
</script>
<template>
  <div class="p-5 border-lime-400 border-2">
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length">
      <PostList :posts="posts" />
    </div>
    <div v-else><Loader /></div>
  </div>
</template>

<style></style>
