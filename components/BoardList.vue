<template>
  <List :boards="boards">
    <template #default="{ item, index }">
      <div
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click="moveToPage(item.id)"
      >
        <div class="flex-grow-1">
          <span :class="{ todo: item.completed }">
            {{ item.subject }}
          </span>
        </div>
        <div>
          <button
            class="btn btn-danger btn-sm"
            @click.stop="openModal(item.id)"
          >
            삭제
          </button>
        </div>
      </div>
    </template>
  </List>

  <!-- <teleport to="#modal">
    <Modal v-if="showModal" @close="closeModal" @delete="deleteBoard" />
  </teleport> -->
</template>

<script>
import { ref, useContext } from "vue";
import List from "@/components/List.vue";
import Modal from "./Modal.vue";

export default {
  components: {
    Modal,
    List,
  },
  props: {
    boards: {
      type: Array,
      required: true,
    },
  },
  emits: ["delete-board"],
  setup() {
    const { emit } = useContext();
    const showModal = ref(false);
    const deleteId = ref(null);

    const openModal = (id) => {
      deleteId.value = id;
      showModal.value = true;
    };

    const closeModal = () => {
      deleteId.value = null;
      showModal.value = false;
    };

    const deleteBoard = () => {
      emit("delete-board", deleteId.value);

      showModal.value = false;
      deleteId.value = null;
    };

    const moveToPage = (boardId) => {
      navigateTo(`/boards/${boardId}`);
    };

    const moveToEditPage = (boardId) => {
      navigateTo(`/boards/edit/${boardId}`);
    };

    return {
      moveToPage,
      moveToEditPage,
      showModal,
      openModal,
      closeModal,
      deleteBoard,
    };
  },
};
</script>
