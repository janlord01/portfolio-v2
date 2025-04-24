<template>
  <q-card class="no-shadow bg-transparent " :class="$q.screen.gt.sm ? 'q-mt-xl' : ''">
    <!-- Row container -->
    <div class="row items-stretch" style="border-left: 1px solid #000; border-top: 1px solid #000">

      <!-- Column 1 -->
      <div class="col column">

        <!-- Show image ONLY on mobile/tablet ABOVE content -->
        <div class="q-pa-md shared-border mobile-profile-img" v-if="!$q.screen.gt.sm" style="text-align: center;">
          <img :src="userStore.userData.profile_image || '/images/janlord.png'" class="img-responsive" /> <br />
          <q-icon name="location_on" />{{ userStore.userData.address || 'Davao City, Philippines' }} <br />
          <span class="text-h3 text-bold">{{ userStore.userData.name || 'Janlord Luga' }}</span><br />
          <span class="text-h5 text-bold">{{ settingStore.settingsData.position || 'Software Engineer' }}</span><br />
          {{ settingStore.settingsData.caption || 'I build solutions that are both fun and efficient.' }} <br />
          <span class="text-body">
            <q-btn color="dark" :size="$q.screen.gt.sm ? 'md' : 'sm'" v-if="userStore.userData.email"
              :href="userStore.userData.email ? 'mailto:janlord.luga@gmail.com' : ''" unelevated round icon="mdi-gmail"
              flat dense />
            <q-btn color="dark" :size="$q.screen.gt.sm ? 'md' : 'sm'" target="_blank" v-if="userStore.userData.email"
              href="https://www.instagram.com/janlordluga/" unelevated round icon="mdi-instagram" flat dense />
            <q-btn color="dark" :size="$q.screen.gt.sm ? 'md' : 'sm'" target="_blank" v-if="userStore.userData.email"
              href="https://www.linkedin.com/in/janlord-luga-a778503a/" unelevated round icon="mdi-linkedin" flat
              dense />
            <q-btn label="download my CV" color="dark" v-if="userStore.userData.cv" flat dense
              :href="userStore.userData.cv" icon="mdi-download" target="_blank" :size="$q.screen.gt.md ? 'sm' : 'sm'" />
            <q-btn label="|" color="dark" v-if="newToken && userStore.userData.cv" flat dense
              :size="$q.screen.gt.md ? 'sm' : 'sm'" />
            <q-btn label="Dashboard" color="dark" icon="mdi-login" v-if="newToken" flat dense :to="'/projects'"
              :size="$q.screen.gt.md ? 'sm' : 'sm'" /> <br />
            <q-btn color="primary" :size="$q.screen.gt.sm ? 'md' : 'sm'" v-if="userStore.userData.email" class="contact"
              :href="userStore.userData.email ? 'mailto:janlord.luga@gmail.com' : ''" unelevated label="contact me" />
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
              :href="userStore.userData.email ? 'mailto:janlord.luga@gmail.com' : ''" unelevated round icon="mdi-gmail"
              flat dense />
            <q-btn color="dark" :size="$q.screen.gt.sm ? 'md' : 'sm'" target="_blank" v-if="userStore.userData.email"
              href="https://www.instagram.com/janlordluga/" unelevated round icon="mdi-instagram" flat dense />
            <q-btn color="dark" :size="$q.screen.gt.sm ? 'md' : 'sm'" target="_blank" v-if="userStore.userData.email"
              href="https://www.linkedin.com/in/janlord-luga-a778503a/" unelevated round icon="mdi-linkedin" flat
              dense />
            <q-btn label="download my CV" color="dark" v-if="userStore.userData.cv" flat dense
              :href="userStore.userData.cv" icon="mdi-download" target="_blank" :size="$q.screen.gt.md ? 'sm' : 'sm'" />
            <q-btn label="|" color="dark" v-if="newToken && userStore.userData.cv" flat dense
              :size="$q.screen.gt.md ? 'sm' : 'sm'" />
            <q-btn label="Dashboard" color="dark" icon="mdi-login" v-if="newToken" flat dense :to="'/projects'"
              :size="$q.screen.gt.md ? 'sm' : 'sm'" /> <br />
            <q-btn color="primary" :size="$q.screen.gt.sm ? 'md' : 'sm'" v-if="userStore.userData.email" class="contact"
              :href="userStore.userData.email ? 'mailto:janlord.luga@gmail.com' : ''" unelevated label="contact me" />
          </span>
        </div>

        <!-- Row 2: Tech Stack -->
        <div class="shared-border">
          <p class="text-bold text-h5 text-grey-9">
            {{ settingStore.settingsData.tech_title || 'Tech Stack' }}
          </p>
          <span v-for="tech in techs" :key="tech.id">
            <q-avatar size="30px" class="q-mr-sm q-mb-sm tech-stack" color="white">
              <img width="30" :src="tech.image_url" />
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
              href="https://github.com/janlord02" unelevated round icon="mdi-github" flat dense />
          </p>
          <img src="https://ghchart.rshah.org/janlord02" alt="GitHub Contributions" class="img-responsive-github" />
        </div>
      </div>

      <!-- Column 2: Show image only on desktop -->
      <!-- Column 2: Show image only on desktop -->
      <div class="col-4 column q-hidden-xs q-hidden-sm" v-if="$q.screen.gt.sm">
        <div class="shared-border-no-padding" style="position: relative; min-height: 300px;">
          <q-spinner-dots v-if="imageLoading" color="primary" size="50px" class="absolute-center" />

          <img :src="userStore.userData.profile_image" width="550" @load="imageLoading = false"
            @error="imageLoading = false" style="display: block; margin: 0 auto;" />
        </div>
      </div>


    </div>
  </q-card>


</template>

<script setup>
import { date, LocalStorage } from "quasar";
import { reactive, computed, onMounted, ref } from "vue";
import axios, { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useSettingsStore } from "src/stores/settings/settingStore";
import { useUserStore } from "src/stores/user/userStore";

const settingStore = useSettingsStore();
const userStore = useUserStore();
const tab = ref('website')
const $q = useQuasar();
const newToken = ref(LocalStorage.getItem('jwt'));
const loading = ref(true);
const posts = ref([]);
const postApps = ref([]);
const postWebs = ref([]);
// Get unique types from fetched projects
const projectTypes = ref([])

const experiences = ref([
]);
const techs = ref([]);
// Fetch data from APIs with loading simulation
const getAllData = async () => {
  try {
    const [projects, experiencesData, techsData] = await Promise.all([
      api.get('/api/v1/projects'),
      api.get('/api/v1/experiences'),
      api.get('/api/v1/tech-stacks'),
    ])

    posts.value = projects.data.projects
    experiences.value = experiencesData.data
    techs.value = techsData.data
    loading.value = false

    // Extract types
    const allTypes = posts.value.flatMap(p => p.type || [])
    projectTypes.value = [...new Set(allTypes)] // Remove duplicates

  } catch (error) {
    console.error(error)
  }
}
const imageLoading = ref(true)

onMounted(() => {
  settingStore.getSetting();
  userStore.getUserData();
  getAllData();
  setTimeout(() => {
    settingStore.changeThemeColor();

  }, 100)
});
</script>


<style lang="css">
.constrain {
  max-width: 1340px;
  margin: 0 auto;
}

.text-name {
  font-family: "Jersey 25", sans-serif;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card {
  flex: 0 1 calc(33.33% - 20px);
  /* Adjust width and margin as needed */
  margin-bottom: 20px;
  /* Adjust margin as needed */
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
  /* Ensure padding is included in width calculation */
}

.shared-border {
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 16px;
  flex: 1;

  width: 100%;
}

.shared-border-no-padding {
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 0;
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}

.contact-btn {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
}


.shared-border-no-padding img {
  position: absolute;
  top: 0px;
}

.tech-stack {
  filter: grayscale(1);
}

.mobile-profile-img {
  width: 100%;
  text-align: center;
}

.img-responsive-github {

  max-width: 100%;
  height: auto;
}

.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
