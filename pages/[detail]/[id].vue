<template>
  <div>
    <h2>{{ form.title }}</h2>
    <p>{{ form.description }}</p>
    <p>{{ form.createdDate }}</p>
    <hr />
    <div class="flex items-center gap-1 mt-4">
      <div>
        <UButton color="gray">이전글</UButton>
      </div>
      <div>
        <UButton color="gray">다음글</UButton>
      </div>
      <div class="me-auto"></div>
      <div>
        <UButton color="gray" @click="goListPage">목록</UButton>
      </div>
      <div>
        <UButton @click="goEditPage">수정</UButton>
      </div>
      <div>
        <UButton color="rose">삭제</UButton>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { getPostById } from "~/server/api/posts";

const id = route.params.id;
console.log(getPostById(id));
const form = ref({});
const route = useRoute();
const fetchPost = () => {
  const data = getPostById(id);
  form.value = { ...data };
};
const goListPage = () => {
  navigateTo("/");
};
const goEditPage = () => {
  route.push(`/edit/${id}`);
};
</script>
<style lang=""></style>
