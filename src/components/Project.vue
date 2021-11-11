<template>
  <div class="project row ms-1 mt-2" @click="openDetails">
    <div class="col-6 cover-image"></div>
    <div
      class="
        col-6
        d-flex
        flex-column
        justify-content-center
        align-items-middle
        mosaic-background
      "
    >
      <div class="p-2 bg-dark-blur rounded text-center text-light">
        {{ project.title }}
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { mosaicMaker } from "../utils/MosaicComputed";
import { Modal } from "bootstrap";
import { projectsService } from "../services/ProjectsService";
import { logger } from "../utils/Logger";
export default {
  props: { project: { type: Object, required: true } },
  setup(props) {
    return {
      coverImg: computed(() => `url(${props.project.coverImg})`),
      openDetails() {
        projectsService.setActive(props.project);
        // NOTE open the details modal using a method
        const modalElm = document.getElementById("project-modal");
        logger.log(modalElm);
        Modal.getOrCreateInstance(modalElm).toggle();
      },
      //NOTE ONLY HERE FOR FANCY MOSAIC not best way to do this but v-bind is style is still weird so this is a weird solution
      mosaicUrls: computed(() => mosaicMaker(props.project.projectImgs).urls),
      mosaicSizes: computed(() => mosaicMaker(props.project.projectImgs).sizes),
      mosaicPositions: computed(
        () => mosaicMaker(props.project.projectImgs).positions
      ),
      mosaicRepeats: computed(
        () => mosaicMaker(props.project.projectImgs).repeats
      ),
    };
  },
};
</script>


<style scoped>
.project {
  min-height: 20vh;
  transition: all 0.12s ease;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
}
.project:hover {
  transform: scale(1.05);
  outline: 1px solid var(--bs-light);
  box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.3);
}

.bg-dark-blur {
  background: rgba(24, 24, 24, 0.562);
  backdrop-filter: blur(20px);
}

.cover-image {
  background-image: v-bind(coverImg);
  background-position: center;
  background-size: cover;
}

.mosaic-background {
  background-image: v-bind(mosaicUrls);
  background-size: v-bind(mosaicSizes);
  background-position: v-bind(mosaicPositions);
  background-repeat: v-bind(mosaicRepeats);
}
</style>
