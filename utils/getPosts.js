import { ref } from 'vue';
import axios from 'axios';

const getPosts = () => {
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
  return { posts, error, load };
};

export default getPosts;
