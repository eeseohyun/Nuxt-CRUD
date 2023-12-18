<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>공지사항</h2>
      <UButton color="gray" @click="moveToCreatePage">글쓰기</UButton>
    </div>

    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchBoard"
    />
    <hr />

    <div v-if="!boards.length">조회할 게시물이 없습니다.</div>
    <BoardList :boards="boards" @delete-board="deleteBoard" />
    <hr />
    <UPagination
      v-if="boards.length"
      v-model="currentPage"
      page-count="limit"
      :total="boards.length"
      @click="getTodos"
    />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import BoardList from "@/components/BoardList.vue";
import axios from "axios";
//import { useToast } from "@/composables/toast";

export default {
  components: {
    BoardList,
  },
  setup() {
    const boards = ref([]);
    const error = ref("");
    const numberOfBoards = ref(0);
    const currentPage = ref(1);
    const searchText = ref("");
    let limit = 5;

    const getDatas = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `boards?_sort=id&_order=desc&title_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        numberOfBoards.value = res.headers["x-total-count"];
        boards.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
        triggerToast("Something went wrong", "danger");
      }
    };

    getDatas();

    const addBoard = async (board) => {
      error.value = "";
      try {
        await axios.post("boards", {
          title: board.title,
          isImportant: board.isImportant,
        });

        getDatas(1);
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
        triggerToast("Something went wrong", "danger");
      }
    };

    const deleteBoard = async (id) => {
      error.value = "";

      try {
        await axios.delete("boards/" + id);

        getDatas(1);
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
        triggerToast("Something went wrong", "danger");
      }
    };

    const toggleBoard = async (index, checked) => {
      error.value = "";
      const id = boards.value[index].id;
      try {
        await axios.patch("boards/" + id, {
          isImportant: checked,
        });

        boards.value[index].isImportant = checked;
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
        triggerToast("Something went wrong", "danger");
      }
    };

    const moveToCreatePage = () => {
      navigateTo("/create");
    };

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getDatas(1);
    };

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getDatas(1);
      }, 2000);
    });

    return {
      searchTodo,
      boards,
      addBoard,
      deleteBoard,
      toggleBoard,
      searchText,
      error,
      numberOfBoards,
      currentPage,
      getDatas,
      moveToCreatePage,
    };
  },
};
</script>
