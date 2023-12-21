import { ref } from "vue";

const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);
  const load = async () => {
    try {
      let response = await fetch("http://localhost:3000/posts");
      if (!response.ok) {
        throw Error("⚠️ 데이터를 읽어올 수 없습니다!");
      }
      posts.value = await response.json();

      console.log(posts.value);
    } catch (err) {
      error.value = err.message;
    }
  };
  return { posts, error, load };
};

export default getPosts;
