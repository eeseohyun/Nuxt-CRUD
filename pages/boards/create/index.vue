<template>
  <UForm
    class="w-auto flex flex-col justify-center items-center p-3"
    :validate="validate"
  >
    <div class="w-full">
      <div class="border-b border-gray-900/10 pb-12">
        <h2
          class="text-xl font-semibold leading-7 text-gray-900 flex justify-center items-centers p-3"
        >
          게시글 등록
        </h2>

        <UFormGroup label="분류" name="tags" class="mt-12">
          <div class="mt-2 w-1/2">
            <USelect
              v-model="state.tags"
              :options="options"
              option-attribute="name"
            />
          </div>
        </UFormGroup>

        <UFormGroup label="제목" name="title" class="mt-4">
          <UInput
            type="text"
            name="title"
            id="title"
            autocomplete="title"
            v-model="state.title"
            required
            class="block flex-1 border-0 bg-transparent py-1.5 px-1 text-gray-900 placeholder:text-gray-400 focus:ring-black sm:text-sm sm:leading-6"
          />
        </UFormGroup>

        <UFormGroup label="내용" name="body" class="mt-4">
          <UTextarea
            id="body"
            name="body"
            rows="10"
            v-model="state.body"
            required
          />
        </UFormGroup>
        <span v-if="errors">{{ errors.message }}</span>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end self-end gap-x-6">
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
  </UForm>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const state = reactive({
  title: undefined,
  body: undefined,
  tags: undefined,
});

const cancelPost = () => {
  router.go(-1);
};
const options = [
  {
    name: "전체",
    value: "all",
  },
  {
    name: "FE",
    value: "FE",
  },
  {
    name: "BE",
    value: "BE",
  },
  {
    name: "디자인",
    value: "design",
  },
  {
    name: "기획",
    value: "plan",
  },
];

const submitPost = async () => {
  const currentDate = new Date().toISOString().split("T")[0];

  try {
    const response = await fetch("http://192.168.1.88:3000/boards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...state,
        updatedDate: currentDate,
      }),
    });
    if (response.ok) {
      const createdPost = await response.json();
      const postId = createdPost.id;
      alert("게시글이 등록되었습니다!");
      return navigateTo("/boards/" + postId);
    } else {
      alert("게시글 등록에 실패하였습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    console.log(error);
    alert("게시글 등록에 실패하였습니다. 다시 시도해주세요.");
  }
};

const validate = (state) => {
  const errors = [];
  if (!state.title)
    errors.push({ path: "title", message: "제목을 입력해주세요" });
  if (!state.body)
    errors.push({ path: "body", message: "내용을 입력해주세요" });
  if (!state.tags)
    errors.push({ path: "tags", message: "해당 태그를 선택해주세요" });
  return errors;
};
</script>
<style></style>
