<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="project-modal"
    tabindex="-1"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-transparent border-0 text-light">
        <div class="modal-header">
          <h5 class="modal-title">{{ activeProject.title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- NOTE V-if here keeps the computed from being accessed before it's available -->
        <div class="modal-body row" v-if="activeProject.id">
          <div v-for="(url, i) in allImgs" :key="'url' + i" class="col-12">
            <img :src="url" alt="" class="img-fluid" />
          </div>
        </div>
        <div class="modal-footer row">
          <!-- NOTE v-if here keeps creator information from showing until is exists -->
          <div
            class="col-12 d-flex align-items-center selectable"
            v-if="activeProject.creator"
            @click="routeTo"
          >
            <img
              height="50"
              class="rounded me-2"
              :src="activeProject.creator.picture"
              alt=""
              srcset=""
            />
            <h6>{{ activeProject.creator.name }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
export default {
  setup() {
    const router = useRouter();
    return {
      activeProject: computed(() => AppState.activeProject),
      allImgs: computed(() => [
        AppState.activeProject.coverImg,
        ...AppState.activeProject.projectImgs,
      ]),
      routeTo() {
        // NOTE close the details modal using a method before we router push
        const modalElm = document.getElementById("project-modal");
        Modal.getOrCreateInstance(modalElm).toggle();
        router.push({
          name: "Profile",
          params: { id: AppState.activeProject.creator.id },
        });
      },
    };
  },
};
</script>


<style scoped>
</style>
