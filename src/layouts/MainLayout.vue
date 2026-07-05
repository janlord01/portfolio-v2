<template>
  <q-layout view="lHh Lpr lFf" class="q-pt-lg">
    <q-btn
      round
      flat
      dense
      :icon="$q.dark.isActive ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      :aria-label="$q.dark.isActive ? 'Switch to light mode' : 'Switch to dark mode'"
      class="dark-mode-toggle"
      @click="toggleDark"
    />
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted } from "vue";
import { useQuasar, LocalStorage } from "quasar";
import { useSettingsStore } from "src/stores/settings/settingStore";
import { useUserStore } from "src/stores/user/userStore";

const $q = useQuasar();
const settingStore = useSettingsStore();
const userStore = useUserStore();

defineOptions({
  name: "MainLayout",
});

const toggleDark = () => {
  $q.dark.toggle();
  LocalStorage.set("darkMode", $q.dark.isActive);
};

onMounted(() => {
  settingStore.getSetting();
  userStore.getUserData();
});
</script>
