<template lang="">
  <div>
    <UModal v-model="isOpen">
      <div class="p-4">
        <slot>{{}}</slot>
      </div>
      <button type="button" class="close">
        <span @click="onClose">&times;</span>
      </button>
    </UModal>
  </div>
</template>
<script>
import { useContext } from "vue";

export default {
  setup() {
    const { emit } = useContext();
    const onClose = () => {
      emit("close");
    };

    return {
      onClose,
    };
  },
};
</script>
<style lang=""></style>
