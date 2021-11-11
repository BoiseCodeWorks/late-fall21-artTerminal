<template>
  <div class="thread row px-5">
    <div v-for="p in projects" :key="p.id" class="col-md-6">
      <!-- NOTE \/\/\/\/ This is where the name of the prop comes from 'p' is the actual data of the prop -->
      <Project :project="p" />
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
export default {
  setup() {
    return {
      projects: computed(() => AppState.projects),
    };
  },
};
</script>


<style scoped>
</style>
