<template>
  <q-page class="constrain q-pa-md">
    <HeaderPart />
    <template v-if="!isClosed">
      <template v-if="!isMinimized">
        <q-card class="no-shadow bg-transparent q-mt-xl">
          <div class="column full-body-table" style="border-left: 1px solid #000; border-top: 1px solid #000">

            <!-- Row 1 with 1 col -->
            <div style="border-right: 1px solid #000; border-bottom: 1px solid #000;">
              <q-toolbar class="">
                <q-toolbar-title>

                </q-toolbar-title>
                <q-btn flat round dense :icon="isMinimized ? 'mdi-arrow-expand' : 'mdi-window-minimize'" size="sm"
                  @click="isMinimized = !isMinimized" />

                <q-btn flat round dense :icon="$q.fullscreen.isActive ? 'mdi-dock-window' : 'mdi-window-maximize'"
                  @click="$q.fullscreen.toggle()" size="sm" />
                <q-btn flat round dense icon="mdi-window-close" size="sm" @click="isClosed = true" />

              </q-toolbar>
            </div>

            <!-- Row 2 with 2 cols -->
            <div class="row items-stretch">
              <div class="col-4 preview" v-if="$q.screen.gt.sm"
                style="border-right: 1px solid #000; border-bottom: 1px solid #000; padding: 16px">
                <div v-if="previewData">
                  <div class="text-h6 text-bold q-mb-sm">{{ previewData.name }}</div>
                  <div class="text-caption text-grey q-mb-sm">{{ previewData.sub_caption }}</div>
                  <q-img :src="previewData.imageUrl" class="q-mb-sm" />

                  <q-card-section class="q-pa-none">
                    <p>{{ previewData.caption }}</p>
                  </q-card-section>

                  <div class="q-mt-sm">
                    <q-chip v-for="(tech, i) in previewData.tech" :key="i" size="sm" class="q-mr-xs">
                      {{ tech }}
                    </q-chip>
                  </div>

                  <div class="q-mt-md">
                    <q-btn v-if="previewData.github_url" icon="mdi-github" flat dense color="black"
                      :href="previewData.github_url" target="_blank" class="q-mr-sm" />
                    <q-btn v-if="previewData.url" icon="mdi-web" flat dense color="primary" :href="previewData.url"
                      target="_blank" />
                  </div>
                </div>
                <div v-else class="text-black about-placeholder q-pa-sm">
                  <p class="text-h6 text-weight-bold q-mb-xs">
                    Hi, I’m Janlord Luga — a software engineer specializing in the Vue.js (Quasar Framework), Laravel,
                    and WordPress with 14+ years of experience.
                  </p>
                  <p class="text-body1 q-mb-xs ">
                    For the past 14 years, I’ve delivered software for companies and institutions worldwide, including
                    point-of-sale platforms, hotel booking tools, school management systems for 15,000+ students, RFID
                    attendance apps, barbershop and tattoo shop systems, community forums, e-canteens, e-libraries, and
                    more.
                  </p>
                  <p class="text-body1 q-mb-xs">
                    I also craft WordPress experiences—from SEO-driven affiliate sites to full e-commerce
                    builds—ensuring
                    seamless UX and scalable performance.
                  </p>
                  <p class="text-body1">
                    I specialize in WordPress, Laravel, and Vue.js (Quasar), combining clean design with smart
                    functionality.
                    I take full ownership, communicate clearly, and stay focused on outcomes. Let’s build something
                    impactful
                    together.
                  </p>
                </div>
              </div>

              <div class="col" style="border-right: 1px solid #000; border-bottom: 1px solid #000; padding: 16px">
                <!-- Row 2 - Column 2 -->
                <div class="col col-sm-8 q-pt-md">
                  <q-tabs v-model="tab" align="left" narrow-indicator dense>
                    <q-tab name="about" label="About" v-if="!$q.screen.gt.sm" />
                    <q-tab v-for="type in projectTypes" :key="type" :name="type" :label="`${type}`" />
                    <q-tab name="experiences" label="Experiences" />
                  </q-tabs>

                  <q-tab-panels v-model="tab" animated transition-prev="fade" transition-next="fade"
                    class="bg-transparent text-black">
                    <q-tab-panel v-for="type in projectTypes" :key="type" :name="type">
                      <div class="q-pa-sm">
                        <div :class="$q.screen.gt.md ? 'row items-stretch justify-left' : 'column items-start'"
                          class="q-mt-md">
                          <q-card v-for="post in posts.filter(p => (p.type || []).includes(type))" :key="post.id"
                            bordered class="q-my-sm q-mr-md"
                            :style="$q.screen.gt.md ? 'flex-basis: 30%; ' : 'width: 100%'" v-ripple
                            style="cursor: pointer;"
                            @click="$q.screen.gt.sm ? previewProject(post) : previewProjectMobile(post)">
                            <q-item>
                              <q-item-section>
                                <q-item-label class="text-bold">{{ post.name }}</q-item-label>
                                <q-item-label caption>{{ post.sub_caption }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-card>
                        </div>
                      </div>
                    </q-tab-panel>

                    <!-- Experience tab -->
                    <q-tab-panel name="experiences">
                      <div class="q-pa-sm">
                        <div :class="$q.screen.gt.md ? 'row items-stretch justify-left' : 'column items-start'"
                          class="q-mt-md">
                          <q-card v-for="post in experiences" :key="post.id" bordered rounded class="q-my-sm q-mr-md"
                            :style="$q.screen.gt.md ? 'flex-basis: 30%' : 'width: 100%'" v-ripple
                            @click="$q.screen.gt.sm ? previewProject(post) : previewProjectMobile(post)"
                            style="cursor: pointer;">
                            <q-item>
                              <q-item-section>
                                <q-item-label class="text-bold">{{ post.name }}</q-item-label>
                                <q-item-label caption>{{ post.sub_caption }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-card>
                        </div>
                      </div>
                    </q-tab-panel>

                    <!-- About tab -->
                    <q-tab-panel name="about">
                      <div class="q-pa-sm">
                        <div :class="$q.screen.gt.md ? 'row items-stretch justify-left' : 'column items-start'"
                          class="q-mt-md">
                          <q-card :style="$q.screen.gt.md ? 'flex-basis: 50%' : 'width: 100%'">
                            <q-item>
                              <q-item-section>
                                <p class="text-h6 text-weight-bold q-mb-xs">
                                  Hi, I’m Janlord Luga — a software engineer specializing in the Vue.js (Quasar
                                  Framework), Laravel, and WordPress with 14+ years of experience.
                                </p>
                                <p class="text-body1 q-mb-xs ">
                                  For the past 14 years, I’ve delivered software for companies and institutions
                                  worldwide, including
                                  point-of-sale platforms, hotel booking tools, school management systems for 15,000+
                                  students, RFID
                                  attendance apps, barbershop and tattoo shop systems, community forums, e-canteens,
                                  e-libraries, and more.
                                </p>
                                <p class="text-body1 q-mb-xs">
                                  I also craft WordPress experiences—from SEO-driven affiliate sites to full e-commerce
                                  builds—ensuring
                                  seamless UX and scalable performance.
                                </p>
                                <p class="text-body1">
                                  I specialize in WordPress, Laravel, and Vue.js (Quasar), combining clean design with
                                  smart functionality.
                                  I take full ownership, communicate clearly, and stay focused on outcomes. Let’s build
                                  something impactful
                                  together.
                                </p>
                              </q-item-section>
                            </q-item>
                          </q-card>
                        </div>
                      </div>

                    </q-tab-panel>
                  </q-tab-panels>
                </div>
              </div>
            </div>

          </div>
        </q-card>
      </template>
      <template v-else>
        <!-- Minimized look -->
        <div class="q-pa-md row items-center justify-between q-mt-xl" style="border: 1px solid #000;">
          <div class="text-bold" @click="isMinimized = false" style="cursor: pointer;"><q-img src="/images/janlord.png"
              width="30px" style="cursor: pointer;" @click="isClosed = false" /> Minimized View

          </div>
          <q-btn flat dense size="sm" icon="mdi-arrow-expand" @click="isMinimized = false" class="q-ml-sm" />
        </div>
      </template>
    </template>
    <template v-else>
      <div class="restore-container">
        <!-- <q-btn round color="primary" icon="mdi-arrow-expand" size="lg" /> -->
        <!-- <p style="display: block;" class="full-width">Click the icon to open</p> -->

        <q-avatar size="100px" class="q-mr-sm q-mb-sm " color="white">
          <q-img src="/images/janlord.png" width="100px" style="cursor: pointer;" @click="isClosed = false" />
          <q-tooltip anchor="top middle" self="center middle" class="bg-primary">
            CLICK TO OPEN
          </q-tooltip>
        </q-avatar>

      </div>
    </template>

    <q-dialog persistent v-model="showPreview">

      <q-card class="my-card " style="min-width: 200px">

        <q-toolbar class="bg-grey-7 text-white">
          <q-toolbar-title>
            Preview
          </q-toolbar-title>
          <q-btn flat round dense icon="close" size="sm" v-close-popup />
        </q-toolbar>
        <q-card-section class="q-pa-md">
          <div class="text-h6 text-bold q-mb-sm">{{ previewData.name }}</div>
          <div class="text-caption text-grey q-mb-sm">{{ previewData.sub_caption }}</div>
          <q-img :src="previewData.imageUrl" class="q-mb-sm" />

          <q-card-section class="q-pa-none">
            <p>{{ previewData.caption }}</p>
          </q-card-section>

          <div class="q-mt-sm">
            <q-chip v-for="(tech, i) in previewData.tech" :key="i" size="sm" class="q-mr-xs">
              {{ tech }}
            </q-chip>
          </div>

          <div class="q-mt-md">
            <q-btn v-if="previewData.github_url" icon="mdi-github" flat dense color="black"
              :href="previewData.github_url" target="_blank" class="q-mr-sm" />
            <q-btn v-if="previewData.url" icon="mdi-web" flat dense color="primary" :href="previewData.url"
              target="_blank" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { date, LocalStorage } from "quasar";
import { reactive, computed, onMounted, ref } from "vue";
import axios, { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useSettingsStore } from "src/stores/settings/settingStore";
import { useUserStore } from "src/stores/user/userStore";
import HeaderPart from "src/components/HeaderPart.vue";

const settingStore = useSettingsStore();
const userStore = useUserStore();
const tab = ref('website')
const $q = useQuasar();
const newToken = ref(LocalStorage.getItem('jwt'));
defineOptions({
  name: "PageHome",
});
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
const previewData = ref(null)
const showPreview = ref(false)

const previewProject = (post) => {
  previewData.value = post
}
const previewProjectMobile = (post) => {
  showPreview.value = true
  previewData.value = post
}
const isMinimized = ref(false)
const isClosed = ref(false)

onMounted(() => {
  if($q.screen.gt.sm){
    tab.value = 'website'
  } else {
    tab.value = 'about'
  }
  settingStore.getSetting();
  userStore.getUserData();
  getAllData();
  // getAllTech();
  // getAllProject();
  // getAllExperience();
  setTimeout(() => {
    settingStore.changeThemeColor();

  }, 100)
  // if(LocalStorage.getItem('jwt')){
  //   userStore.getUserData();
  // }
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

/* .tech-stack {
  filter: grayscale(1);
} */

.mobile-profile-img {
  width: 100%;
  text-align: center;
}

.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.minimized-card {
  max-width: 300px;
  margin: 0 auto;
}

.restore-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  /* border: 1px solid #000; */
  margin-top: 100px;
}

.full-body-table {
  width: 100%;
  max-width: 100%;
}

.about-placeholder {
  line-height: 1.5;
}
</style>
