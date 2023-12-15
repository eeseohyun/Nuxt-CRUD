<template>
  <div>
    <div class="w-full p-10 flex justify-center">
      <h2 class="font-bold text-xl">게시글 수정</h2>
      <hr class="my-3" />
    </div>
    <UForm class="p-10 space-y-10">
      <UFormGroup label="제목" name="title">
        <UInput v-model="title" />
      </UFormGroup>

      <UFormGroup label="내용" name="description">
        <UTextarea
          v-model="description"
          variant="outline"
          size="xl"
          rows="10"
          class="w-full"
          placeholder="내용을 입력해주세요."
        />
      </UFormGroup>
      <div class="flex gap-2 justify-end">
        <UButton type="submit" class="p-2" color="rose" @click="goDetailPage">
          취소
        </UButton>
        <UButton type="submit" class="p-2" color="gray"> 수정 </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

const goDetailPage = () => {
  navigateTo(`/post/${route.params.id}`);
};
const title = ref("");
const description = ref("");
</script>
