<template>
  <div class="search row px-5">
    <div class="col-12">
      <!-- NOTE submits searches when the form is submitted -->
      <form @submit.prevent="searchProjects" class="input-group">
        <!-- NOTE keypress submits on each keypress, ideally you don't want both of these on your search bar but can be helpful -->
        <input
          @keypress="searchProjects"
          v-model="searchText"
          class="form-control"
          placeholder="search projects"
          type="text"
          name=""
          id=""
        />
        <button class="btn btn-outline-primary">search</button>
      </form>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { projectsService } from "../services/ProjectsService";
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const searchText = ref("");
    return {
      searchText,
      async searchProjects() {
        try {
          await projectsService.getAll("?query=" + searchText.value);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style scoped>
</style>
