<template>
  <form class="flex flex-col max-w-md mx-auto justify-center">
    <div class="w-full">
      <div class="border-b border-gray-900/10 pb-12">
        <h2
          class="text-xl font-semibold leading-7 text-gray-900 flex justify-center items-centers p-3"
        >
          게시글 등록
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
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 sm:max-w-md"
              >
                <input
                  type="text"
                  name="title"
                  id="title"
                  autocomplete="title"
                  v-model="title"
                  required
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
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
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-400 sm:text-sm sm:leading-6"
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
        @click="cancelPost"
      >
        취소
      </button>
      <button
        @click.prevent="submitPost"
        type="submit"
        class="rounded-md bg-lime-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        등록
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const title = ref("");
const body = ref("");
const tags = ref("");

const cancelPost = () => {
  router.go(-1);
};

const submitPost = async () => {
  const currentDate = new Date().toISOString().split("T")[0];

  try {
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.value,
        body: body.value,
        updatedDate: currentDate,
        tags: tags.value,
      }),
    });
    if (response.ok) {
      const createdPost = await response.json();
      const postId = createdPost.id;
      alert(`게시글이 등록되었습니다! ID: ${postId}`);
      navigateTo("/boards/" + postId);
    } else {
      alert("게시글 등록에 실패하였습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    console.log(error);
    alert("게시글 등록에 실패하였습니다. 다시 시도해주세요.");
  }
};
</script>
<style></style>
