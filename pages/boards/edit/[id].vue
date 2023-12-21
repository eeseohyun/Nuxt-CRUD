<template>
  <div
    class="bg-gray-100 flex flex-col items-center justify-center h-screen px-2 py-4"
  >
    <div class="flex flex-col w-full lg:w-1/2 h-full bg-white px-9 py-3">
      <form class="w-auto flex flex-col justify-center items-center p-3">
        <div class="w-full">
          <div class="border-b border-gray-900/10 pb-12">
            <h2
              class="text-xl font-semibold leading-7 text-gray-900 flex justify-center items-centers p-3"
            >
              게시글 수정
            </h2>
            <div class="mt-10">
              <label
                for="tags"
                class="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >분류</label
              >
              <select
                v-model="tags"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-lime-700 dark:border-lime-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
              >
                <option value="all">전체</option>
                <option value="FE">FE</option>
                <option value="BE">BE</option>
                <option value="design">디자인</option>
                <option value="plan">기획</option>
              </select>
            </div>

            <div class="mt-10">
              <div>
                <label
                  for="title"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >제목</label
                >

                <div
                  class="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 sm:max-w-md"
                >
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autocomplete="title"
                    v-model="title"
                    class="block w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label
                  for="body"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >내용</label
                >
                <div class="mt-2">
                  <textarea
                    id="body"
                    name="body"
                    rows="10"
                    v-model="body"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-lime-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900"
            @click="cancelEdit()"
          >
            취소
          </button>
          <button
            @click="editPost(id)"
            type="submit"
            class="rounded-md bg-lime-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const selectPost = ref({});
const title = ref("");
const body = ref("");
const tags = ref("");
const router = useRouter();
const error = ref(null);
const cancelEdit = () => {
  router.go(-1);
};
const load = async () => {
  const route = useRoute();
  const id = route.params.id;
  try {
    let response = await fetch("http://localhost:3000/posts" + id, {
      method: "GET",
    });
    if (!response.ok) {
      throw Error("⚠️ 데이터를 읽어올 수 없습니다!");
    }
    selectPost.value = await response.json();
    title.value = selectPost.value.title;
    body.value = selectPost.value.body;
    tags.value = selectPost.value.tags;
  } catch (err) {
    error.value = err.message;
  }
};

const editPost = async (postId) => {
  const updateDate = new Date().toISOString().split("T")[0];
  try {
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        body: body.value,
        updatedDate: updateDate,
        tags: tags.value,
      }),
    });
    if (!response.ok) {
      throw Error("게시글 수정에 실패하였습니다.");
    }

    selectPost.value = response.data().json();
    alert("게시글을 수정하였습니다.");
    navigateTo(`/boards/${postId}`);
  } catch (error) {
    console.log(error.message);
  }
};

load(); //page 로드 시, 데이터를 미리 불러오도록 설정
</script>
<style></style>
