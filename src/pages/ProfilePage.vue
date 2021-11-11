<template>
  <div class="profile container-fluid text-center">
    <div class="row">
      <div class="col-4 bg-primary elevation-2 ms-2">
        <h1>{{ profile.name }}</h1>
        <img class="rounded" :src="profile.picture" alt="" />
        <p>{{ profile.email }}</p>
      </div>
    </div>
    <CreateProject v-if="account.id == profile.id" />
    <Thread />
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { profilesService } from "../services/ProfileService";
import { useRoute } from "vue-router";
import { projectsService } from "../services/ProjectsService";
export default {
  name: "Profile",
  setup() {
    const route = useRoute();
    // NOTE watchEffect runs when ever the data used within the watchEffect( route.params.id ) changes
    watchEffect(async () => {
      try {
        // NOTE if statement here checks to make sure this only runs on the profile page and not when we leave the profile page
        if (route.name == "Profile") {
          await profilesService.getProfile(route.params.id);
          await projectsService.getAll("?creatorId=" + route.params.id);
        }
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
