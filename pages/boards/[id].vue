<template>
  <div
    class="bg-gray-100 flex flex-col items-center justify-center h-screen px-2 py-4"
  >
    <div class="flex flex-col w-full lg:w-1/2 h-full bg-white px-9">
      <div class="w-auto flex justify-between items-center p-3">
        <h2 class="text-xl font-semibold">{{ currentPost.title }}</h2>
        <div class="flex gap-2">
          <button
            @click="moveToEditPage()"
            class="flex items-center bg-gray-300 text-white font-semibold py-2 px-2 rounded-md transition-colors duration-300"
          >
            <p class="text-white">수정</p>
          </button>
          <button
            @click="callConfirm()"
            class="flex items-center bg-rose-500 text-white font-semibold py-2 px-2 rounded-md transition-colors duration-300"
          >
            <p class="text-white">삭제</p>
          </button>
        </div>
        <span>{{ currentPost.tags }}</span>
      </div>

      <hr />
      <div class="py-10 w-auto h-[400px] border-b border-1">
        <p class="overflow-hidden">
          {{ currentPost.body }}
        </p>
      </div>

      <div class="mt-3 flex self-end">
        <button
          @click="moveToListPage"
          class="flex items-center bg-gray-300 text-white font-semibold py-2 px-2 rounded-md transition-colors duration-300"
        >
          <p class="text-white">목록</p>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const id = route.params.id;
const currentPost = ref([]);
const error = ref(null);
const moveToEditPage = () => {
  navigateTo("/boards/edit/" + id);
};

const moveToListPage = () => {
  navigateTo("/boards");
};

const callConfirm = () => {
  if (confirm("정말 삭제하시겠습니까?")) {
    deletePost();
    moveToListPage();
  } else {
    return;
  }
};
const deletePost = async () => {
  try {
    const response = await fetch("http://localhost:3000/posts/" + id, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw Error("게시글 삭제에 실패하였습니다.");
    }
    alert("삭제가 완료되었습니다.");
  } catch (error) {
    console.log(error.message);
  }
};
const load = async () => {
  try {
    let response = await useFetch("http://localhost:3000/posts/" + id);
    if (!response.ok) {
      throw Error("⚠️ 데이터를 읽어올 수 없습니다!");
    }
    currentPost.value = await response.json();

    console.log(posts.value);
  } catch (err) {
    error.value = err.message;
  }
};
load();
</script>
<style></style>
