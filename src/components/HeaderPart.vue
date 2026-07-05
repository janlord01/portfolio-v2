<template>
  <q-card class="no-shadow bg-transparent " :class="$q.screen.gt.sm ? 'q-mt-xl' : ''">
    <!-- Row container -->
    <!-- q--avoid-card-border: QCard strips borders on direct div children -->
    <div class="row items-stretch frame-top-left q--avoid-card-border">

      <!-- Column 1 -->
      <div class="col column">

        <!-- Show image ONLY on mobile/tablet ABOVE content -->
        <div class="q-pa-md shared-border mobile-profile-img" v-if="!$q.screen.gt.sm" style="text-align: center;">
          <img :src="userStore.userData.profile_image || '/images/janlord.png'"
            :alt="userStore.userData.name || 'Janlord Luga'" class="img-responsive" /> <br />
          <q-icon name="location_on" />{{ userStore.userData.address || 'Davao City, Philippines' }} <br />
          <span class="text-h3 text-bold">{{ userStore.userData.name || 'Janlord Luga' }}</span><br />
          <span class="text-h5 text-bold">{{ settingStore.settingsData.position || 'Software Engineer' }}</span><br />
          {{ settingStore.settingsData.caption || 'I build solutions that are both fun and efficient.' }} <br />
          <span class="text-body">
            <q-btn color="dark" :size="$q.screen.gt.sm ? 'md' : 'sm'" v-if="userStore.userData.email"
              :href="'mailto:' + userStore.userData.email" aria-label="Send me an email" unelevated round
              icon="mdi-gmail" flat dense />
            <q-btn color="dark" :size="$q.screen.gt.sm ? 'md' : 'sm'" target="_blank" v-if="userStore.userData.email"
              href="https://www.instagram.com/janlordluga/" aria-label="Instagram profile" unelevated round
              icon="mdi-instagram" flat dense />
            <q-btn color="dark" :size="$q.screen.gt.sm ? 'md' : 'sm'" target="_blank" v-if="userStore.userData.email"
              href="https://www.linkedin.com/in/janlord-luga-a778503a/" aria-label="LinkedIn profile" unelevated round
              icon="mdi-linkedin" flat dense />
            <q-btn label="download my CV" color="dark" v-if="userStore.userData.cv" flat dense
              :href="userStore.userData.cv" icon="mdi-download" target="_blank" :size="$q.screen.gt.md ? 'sm' : 'sm'" />
            <span v-if="newToken && userStore.userData.cv" aria-hidden="true">|</span>
            <q-btn label="Dashboard" color="dark" icon="mdi-login" v-if="newToken" flat dense :to="'/projects'"
              :size="$q.screen.gt.md ? 'sm' : 'sm'" /> <br />
            <q-btn color="primary" :size="$q.screen.gt.sm ? 'md' : 'sm'" v-if="userStore.userData.email" class="contact"
              :href="'mailto:' + userStore.userData.email" unelevated label="contact me" />
          </span>
        </div>

        <!-- Row 1: Location and contact -->
        <div class="shared-border" v-if="$q.screen.gt.sm">
          <q-icon name="location_on" />{{ userStore.userData.address || 'Davao City, Philippines' }} <br />
          <span class="text-h3 text-bold">{{ userStore.userData.name || 'Janlord Luga' }}</span><br />
          <span class="text-h5 text-bold">{{ settingStore.settingsData.position || 'Software Engineer'
            }}</span><br />
          {{ settingStore.settingsData.caption || 'I build solutions that are both fun and efficient.' }} <br />


          <span class="text-body">
            <q-btn color="dark" :size="$q.screen.gt.sm ? 'md' : 'sm'" v-if="userStore.userData.email"
              :href="'mailto:' + userStore.userData.email" aria-label="Send me an email" unelevated round
              icon="mdi-gmail" flat dense />
            <q-btn color="dark" :size="$q.screen.gt.sm ? 'md' : 'sm'" target="_blank" v-if="userStore.userData.email"
              href="https://www.instagram.com/janlordluga/" aria-label="Instagram profile" unelevated round
              icon="mdi-instagram" flat dense />
            <q-btn color="dark" :size="$q.screen.gt.sm ? 'md' : 'sm'" target="_blank" v-if="userStore.userData.email"
              href="https://www.linkedin.com/in/janlord-luga-a778503a/" aria-label="LinkedIn profile" unelevated round
              icon="mdi-linkedin" flat dense />
            <q-btn label="download my CV" color="dark" v-if="userStore.userData.cv" flat dense
              :href="userStore.userData.cv" icon="mdi-download" target="_blank" :size="$q.screen.gt.md ? 'sm' : 'sm'" />
            <span v-if="newToken && userStore.userData.cv" aria-hidden="true">|</span>
            <q-btn label="Dashboard" color="dark" icon="mdi-login" v-if="newToken" flat dense :to="'/projects'"
              :size="$q.screen.gt.md ? 'sm' : 'sm'" /> <br />
            <q-btn color="primary" :size="$q.screen.gt.sm ? 'md' : 'sm'" v-if="userStore.userData.email" class="contact"
              :href="'mailto:' + userStore.userData.email" unelevated label="contact me" />
          </span>
        </div>

        <!-- Row 2: Tech Stack -->
        <div class="shared-border">
          <p class="text-bold text-h5 text-grey-9">
            {{ settingStore.settingsData.tech_title || 'Tech Stack' }}
          </p>
          <span v-for="tech in techs" :key="tech.id">
            <q-avatar size="30px" class="q-mr-sm q-mb-sm tech-stack" color="white">
              <img width="30" :src="tech.image_url" :alt="tech.name" loading="lazy" />
              <q-tooltip class="bg-primary">
                {{ tech.name }}
              </q-tooltip>
            </q-avatar>
          </span>
        </div>

        <!-- Row 3: GitHub -->
        <div class="shared-border">
          <p class="text-bold text-h5 text-grey-9">
            GitHub
            <q-btn color="dark" :size="$q.screen.gt.sm ? 'md' : 'sm'" v-if="userStore.userData.email" target="_blank"
              href="https://github.com/janlord02" aria-label="GitHub profile" unelevated round icon="mdi-github" flat
              dense />
          </p>
          <img src="https://ghchart.rshah.org/janlord02" alt="GitHub contributions chart" loading="lazy"
            class="img-responsive-github" />
        </div>
      </div>

      <!-- Column 2: Show image only on desktop -->
      <div class="col-4 column q-hidden-xs q-hidden-sm" v-if="$q.screen.gt.sm">
        <div class="shared-border-no-padding" style="position: relative; min-height: 300px;">
          <q-spinner-dots v-if="imageLoading" color="primary" size="50px" class="absolute-center" />

          <img :src="userStore.userData.profile_image || '/images/janlord.png'"
            :alt="userStore.userData.name || 'Janlord Luga'" width="550" @load="imageLoading = false"
            @error="imageLoading = false" style="display: block; margin: 0 auto;" />
        </div>
      </div>


    </div>
  </q-card>


</template>

<script setup>
import { onMounted, ref } from "vue";
import { LocalStorage, useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useSettingsStore } from "src/stores/settings/settingStore";
import { useUserStore } from "src/stores/user/userStore";

const settingStore = useSettingsStore();
const userStore = useUserStore();
const $q = useQuasar();
const newToken = ref(LocalStorage.getItem("jwt"));
const techs = ref([]);
const imageLoading = ref(true);

// Settings and user data are loaded once by MainLayout; only tech stacks are
// specific to this component.
const getTechStacks = async () => {
  try {
    const { data } = await api.get("/api/v1/tech-stacks");
    techs.value = data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getTechStacks();
});
</script>
