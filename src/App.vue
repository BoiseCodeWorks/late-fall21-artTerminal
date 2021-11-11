<template>
  <header>
    <Navbar />
  </header>
  <main class="text-light">
    <router-view />
  </main>
  <footer>
    <ProjectModal />
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.modal.fade {
  background: rgba(22, 22, 22, 0.438);
  backdrop-filter: blur(20px);
}
</style>
