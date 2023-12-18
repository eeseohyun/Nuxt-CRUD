<template>
  <div v-if="loading">
    <Loading />
  </div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <input label="제목" v-model="board.title" :error="titleError" />
      </div>
      <div v-if="editing" class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <UCheckbox
              v-model="board.isImportant"
              :model-value="false"
              label="중요"
              @click="toggleStatus"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-group">
          <label>내용</label>
          <textarea
            v-model="board.description"
            class="form-control"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary" :disabled="!boardUpdated">
      {{ editing ? "수정" : "등록" }}
    </button>
    <button class="btn btn-outline-dark ml-2" @click="moveToBoardListPage">
      취소
    </button>
  </form>
</template>

<script>
import axios from "axios";
import { Loading } from "#build/components";
import { ref, computed } from "vue";
import _ from "lodash";

export default {
  components: {
    Loading,
    UCheckbox,
  },
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const board = ref({
      title: "",
      description: "",
      updatedDate: "",
      isImportant: false,
    });

    const titleError = ref("");
    const originalBoard = ref(null);
    const loading = ref(false);

    const boardId = route.params.id;

    const getData = async () => {
      loading.value = true;
      try {
        const res = await axios.get(`boards/${boardId}`);

        board.value = { ...res.data };
        originalBoard.value = { ...res.data };

        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
        triggerToast("Something went wrong", "danger");
      }
    };

    const boardUpdated = computed(() => {
      return !_.isEqual(board.value, originalBoard.value);
    });

    const toggleStatus = () => {
      board.value.isImportant = !board.value.isImportant;
    };

    const moveToBoardListPage = () => {
      navigateTo("/boards");
    };

    if (props.editing) {
      getData();
    }

    const onSave = async () => {
      titleError.value = "";
      if (!board.value.title) {
        titleError.value = "제목은 필수 입력입니다.";
        return;
      }

      try {
        let res;
        const data = {
          title: board.value.title,
          description: board.value.description,
          updatedDate: new Date(),
          isImportant: board.value.isImportant,
        };
        if (props.editing) {
          res = await axios.put(`boards/${boardId}`, data);
          originalBoard.value = { ...res.data };
        } else {
          res = await axios.post("boards", data);
          board.value.title = "";
          board.value.description = "";
          updatedDate = "";
          isImportant = "";
        }

        const message = (props.editing ? "수정" : "등록") + "완료되었습니다!";
        triggerToast(message);

        if (!props.editing) {
          navigateTo("/boards");
        }
      } catch (error) {
        console.log(error);
        triggerToast("Something went wrong", "danger");
      }
    };

    return {
      board,
      loading,
      toggleStatus,
      moveToBoardListPage,
      onSave,
      boardUpdated,
      showToast,
      toastMessage,
      toastAlertType,
      titleError,
    };
  },
};
</script>

<style></style>
