<template>
  <div class="home container-fluid">
    <Search />
    <Thread />
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { projectsService } from "../services/ProjectsService";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await projectsService.getAll();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {};
  },
};
</script>

<style scoped lang="scss">
</style>
