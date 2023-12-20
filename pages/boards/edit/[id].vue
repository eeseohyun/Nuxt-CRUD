<template>
  <form class="flex flex-col max-w-md mx-auto justify-center">
    <div class="w-full">
      <div><Loader /></div>
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
            v-model="editTags"
            value="selectPost.tags"
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
                  v-model="editTitle"
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
                v-model="editBody"
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
        @click="cancelPost()"
      >
        취소
      </button>
      <button
        @click.prevent="editPost"
        type="submit"
        class="rounded-md bg-lime-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        등록
      </button>
    </div>
  </form>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Loader from '~/components/Loader.vue';

const selectPost = ref([]);
const editTitle = ref('');
const editBody = ref('');
const editTags = ref('');
const router = useRouter();
const id = router.params.id;
const error = ref(null);
const isLoading = ref(false);
const load = async () => {
  try {
    isLoading = true;
    let response = await fetch('http://localhost:3000/posts' + id, {
      method: 'GET',
    });
    if (!response.ok) {
      throw Error('⚠️ 데이터를 읽어올 수 없습니다!');
    }
    isLoading = false;
    selectPost.value = await response.json();
  } catch (err) {
    error.value = err.message;
  }
};
load();
const editPost = async () => {
  const updateDate = new Date().toISOString().split('T')[0];
  try {
    const response = await fetch('http://localhost:3000/posts/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        title: editTitle.value,
        body: editBody.value,
        updatedDate: updateDate,
        tags: editTags.value,
      }),
    });
    if (!response.ok) {
      throw Error('게시글 수정에 실패하였습니다.');
    }

    selectPost.value = response.data().json();
    alert('게시글을 수정하였습니다.');
    navigateTo('/boards/' + id);
  } catch (error) {
    console.log(error.message);
  }
};
</script>
<style></style>
