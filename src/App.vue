<template>
  <div>
    <transition name="app-load-fade">
      <div
        v-show="!appReady"
        class="app-loading fullscreen flex flex-center flex-column"
      >
        <img
          src="/images/janlord.png"
          alt="Loading"
          class="app-loading-logo"
        />
        <q-spinner-dots color="primary" size="40px" class="q-mt-md" />
      </div>
    </transition>
    <router-view v-show="appReady" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineOptions({
  name: "App",
});

const appReady = ref(false);

onMounted(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      appReady.value = true;
    });
  });
});
</script>

<style scoped>
.app-loading {
  background: #fff;
  z-index: 9999;
}

.app-loading-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  animation: app-load-pulse 1s ease-in-out infinite;
}

@keyframes app-load-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.app-load-fade-enter-active,
.app-load-fade-leave-active {
  transition: opacity 0.25s ease;
}

.app-load-fade-enter-from,
.app-load-fade-leave-to {
  opacity: 0;
}
</style>
