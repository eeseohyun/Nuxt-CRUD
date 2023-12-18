<script>
export default {
  props: {
    boards: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div v-for="(item, index) in boards" :key="item.id" class="mt-2">
    <slot :item="item" :index="index"></slot>
  </div>
</template>

<style></style>
