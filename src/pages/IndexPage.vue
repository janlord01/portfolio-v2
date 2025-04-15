<template>
  <q-page class="constrain q-pa-md">
    <q-card class="no-shadow bg-transparent">
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-sm-4 large-screen-only">
          <q-item :class="$q.screen.gt.sm ? 'fixed' : 'relative'"
            :style="$q.screen.gt.sm ? 'width: 400px;top:20px;' : 'max-width: 400px;'">
            <q-item-section avatar :class="$q.screen.gt.sm ? 'full-width' : ''"
              :style="$q.screen.gt.sm ? ' ' : 'margin-top:-30px;'">
              <template v-if="settingStore.loading">
                <q-skeleton type="QAvatar" :size="$q.screen.gt.sm ? '100px' : '120px'" />
              </template>
              <q-avatar :size="$q.screen.gt.sm ? '100px' : '100px'" v-else>
                <!-- <img
                  :src="userStore.userData.profile_image ? userStore.userData.profile_image : '/images/janlord.png'" /> -->

                <img :src="'/images/janlord02.png'" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div :class="$q.screen.gt.sm ? 'full-width' : ''" :style="$q.screen.gt.sm
                ? 'position: absolute; top: 150px; left: 10px'
                : 'position: relative;top: 0px; left: 10px; '
                ">
                <template v-if="settingStore.loading">
                  <q-skeleton type="QToolbar" width="100px" class="q-mt-md" animation="fade" />
                  <q-skeleton type="text" width="150px" />
                  <q-skeleton type="QBtn" width="100px" class="q-mt-md" />

                  <q-skeleton type="QToolbar" width="150px" class="q-mt-xl" v-if="$q.screen.gt.sm" />
                  <q-skeleton type="text" width="200px" v-if="$q.screen.gt.sm" />

                  <q-skeleton type="QToolbar" width="100px" class="q-mt-xl" v-if="$q.screen.gt.sm" />
                  <q-item class="q-mt-md" v-if="$q.screen.gt.sm">
                    <q-item-section avatar>
                      <q-skeleton type="QAvatar" />
                    </q-item-section>
                    <q-item-section avatar>
                      <q-skeleton type="QAvatar" />
                    </q-item-section>
                    <q-item-section avatar>
                      <q-skeleton type="QAvatar" />
                    </q-item-section>
                    <q-item-section avatar>
                      <q-skeleton type="QAvatar" />
                    </q-item-section>
                  </q-item>
                  <q-item v-if="$q.screen.gt.sm">
                    <q-item-section avatar>
                      <q-skeleton type="QAvatar" />
                    </q-item-section>
                    <q-item-section avatar>
                      <q-skeleton type="QAvatar" />
                    </q-item-section>
                    <q-item-section avatar>
                      <q-skeleton type="QAvatar" />
                    </q-item-section>
                    <q-item-section avatar>
                      <q-skeleton type="QAvatar" />
                    </q-item-section>
                  </q-item>
                  <q-item v-if="$q.screen.gt.sm">
                    <q-item-section avatar>
                      <q-skeleton type="QAvatar" />
                    </q-item-section>
                    <q-item-section avatar>
                      <q-skeleton type="QAvatar" />
                    </q-item-section>
                    <q-item-section avatar>
                      <q-skeleton type="QAvatar" />
                    </q-item-section>
                    <q-item-section avatar>
                      <q-skeleton type="QAvatar" />
                    </q-item-section>
                  </q-item>

                </template>
                <template v-else>
                  <p class="text-bold text-name text-grey-9"
                    :style="$q.screen.gt.sm ? 'font-size: 40px;margin-top: -30px;' : 'font-size: 20px'">
                    {{ userStore.userData.name || 'Janlord Luga' }}
                  </p>
                  <span :style="$q.screen.gt.sm
                    ? 'margin-top: -25px; display: block'
                    : 'margin-top: -15px;display: block'
                    "><q-icon name="location_on" />{{ userStore.userData.address || 'Davao City, Philippines' }}
                  </span>
                  <q-btn color="primary" :size="$q.screen.gt.sm ? 'sm' : 'sm'" v-if="userStore.userData.email"
                    :href="userStore.userData.email ? 'mailto:janlord.luga@gmail.com' : ''" unelevated round
                    icon="mdi-gmail" flat dense />
                  <q-btn color="primary" :size="$q.screen.gt.sm ? 'sm' : 'sm'" v-if="userStore.userData.email"
                    href="https://www.instagram.com/janlordluga/" unelevated round icon="mdi-instagram" flat dense />
                  <q-btn color="primary" :size="$q.screen.gt.sm ? 'sm' : 'sm'" v-if="userStore.userData.email"
                    href="https://www.linkedin.com/in/janlord-luga-a778503a/" unelevated round icon="mdi-linkedin" flat
                    dense /> <br />

                  <q-btn color="primary" :size="$q.screen.gt.sm ? 'md' : 'sm'" v-if="userStore.userData.email"
                    :href="userStore.userData.email ? 'mailto:janlord.luga@gmail.com' : ''" unelevated
                    label="contact me" />

                  <p class="text-bold text-name text-grey-9" style="font-size: 25px; margin-top: 20px"
                    :style="$q.screen.gt.sm ? 'display:block;' : 'display:none'">
                    {{ settingStore.settingsData.position || 'Software Engineer' }}
                  </p>
                  <p :style="$q.screen.gt.sm ? 'display:block; width: 300px' : 'display:none'" class="text-grey-9"
                    style="font-size: 14px; margin-top: -20px">
                    {{ settingStore.settingsData.caption || 'I build solutions that are both fun and efficient.' }}
                  </p>
                  <div :style="$q.screen.gt.sm ? 'display:block;' : 'display:none'">
                    <p class="text-bold text-name text-grey-9" style="font-size: 25px; margin-top: 20px">
                      {{ settingStore.settingsData.tech_title || 'Tech Stack' }}
                    </p>
                    <div class="row items-start q-gutter-md" style="width: 300px;">
                      <div v-for="tech in techs" :key="tech.id" class="column items-center"
                        style="width: 30px; text-align: center;">
                        <q-avatar size="30px" color="white">
                          <img width="50" :src="tech.image_url" />
                          <q-tooltip class="bg-primary">
                            {{ tech.name }}
                          </q-tooltip>
                        </q-avatar>
                        <!-- <div class="text-caption q-mt-xs ellipsis" style="max-width: 100%;">
                          {{ tech.name }}
                        </div> -->
                      </div>
                    </div>



                  </div>
                  <div :style="$q.screen.gt.sm ? 'margin-top: -10px;' : ''">
                    <q-btn label="download my CV" :class="$q.screen.gt.md ? 'q-mt-lg' : 'q-mt-sm'" color="primary"
                      v-if="userStore.userData.cv" flat dense :href="userStore.userData.cv ? userStore.userData.cv : ''"
                      icon="mdi-download" target="_blank" :size="$q.screen.gt.md ? 'sm' : 'sm'" />

                    <q-btn label="|" :class="$q.screen.gt.md ? 'q-mt-lg' : 'q-mt-sm'" color="primary"
                      v-if="newToken && userStore.userData.cv" flat dense :size="$q.screen.gt.md ? 'sm' : 'sm'" />
                    <q-btn label="Dashboard" :class="$q.screen.gt.md ? 'q-mt-lg' : 'q-mt-sm'" color="primary"
                      icon="mdi-login" v-if="newToken" flat dense :to="'/projects'"
                      :size="$q.screen.gt.md ? 'sm' : 'sm'" />
                  </div>
                </template>

              </div>

            </q-item-section>
          </q-item>
          <template v-if="settingStore.loading">

            <q-skeleton type="QToolbar" width="150px" class="q-mt-xl" style="display: block; margin: 80px auto;"
              v-if="!$q.screen.gt.sm" />
            <q-skeleton type="Qtext" width="200px" v-if="!$q.screen.gt.sm"
              style="display: block; margin: -80px auto;" />
            <div style="margin-top: 120px;">
              <q-skeleton type="QToolbar" width="100px" class="q-mt-xl" style="display: block; margin:auto;"
                v-if="!$q.screen.gt.sm" />
              <q-item class="q-mt-md q-ml-xl" v-if="!$q.screen.gt.sm">
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>
              </q-item>
              <q-item v-if="!$q.screen.gt.sm" class="q-ml-xl">
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>
              </q-item>
              <q-item v-if="!$q.screen.gt.sm" class="q-ml-xl">
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>
              </q-item>
            </div>

          </template>
          <template v-else>
            <div class="q-pa-sm" :style="$q.screen.gt.sm
              ? 'display:none;'
              : 'display:block; max-width:320px; border: solid  1px #E5E5E5;margin:auto'
              ">

              <p class="text-bold text-name text-grey-9 text-center" style="font-size: 23px; margin-top: 20px">
                {{ settingStore.settingsData.position || 'Software Engineer' }}
              </p>
              <p class="text-grey-9 text-center" style="font-size: 14px; margin-top: -20px">
                {{ settingStore.settingsData.caption || 'I build solutions that are both fun and efficient.' }}
              </p>

              <p class="text-bold text-name text-grey-9 text-center" style="font-size: 25px; margin-top: 20px">
                {{ settingStore.settingsData.tech_title || 'Tech Stack' }}
              </p>
              <span v-for="tech in techs" :key="tech.id">
                <q-avatar size="50px" class="q-mr-sm q-mb-sm" color="white">
                  <img width="50" :src="tech.image_url" />
                  <q-tooltip class="bg-primary">
                    {{ tech.name }}
                  </q-tooltip>
                </q-avatar>
              </span>
            </div>
          </template>
        </div>

        <div class="col col-sm-8">
          <q-tabs v-model="tab" align="justify" narrow-indicator>
            <q-tab v-for="type in projectTypes" :key="type" :name="type" :label="`${type}s`" />
            <q-tab name="experiences" label="Experiences" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated transition-prev="fade" transition-next="fade"
            class="bg-transparent text-black">
            <q-tab-panel v-for="type in projectTypes" :key="type" :name="type">
              <div class="q-pa-sm">
                <div :class="$q.screen.gt.md ? 'row items-stretch justify-left' : 'column items-start'" class="q-mt-md">
                  <div v-if="loading" class="row full-width">
                    <q-card v-for="i in 6" :key="i" flat bordered
                      :style="$q.screen.gt.md ? 'flex-basis: 48%;' : 'width: 100%'">
                      <q-item>
                        <q-item-section avatar>
                          <q-skeleton type="QAvatar" animation="fade" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label><q-skeleton type="text" animation="fade" /></q-item-label>
                          <q-item-label caption><q-skeleton type="text" animation="fade" /></q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-skeleton height="200px" square animation="fade" />
                      <q-card-section>
                        <q-skeleton type="text" class="text-subtitle2" animation="fade" />
                        <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
                      </q-card-section>
                    </q-card>
                  </div>

                  <q-card v-else v-for="post in posts.filter(p => (p.type || []).includes(type))" :key="post.id"
                    bordered rounded style="border-radius: 20px" class="q-my-sm q-mr-md"
                    :style="$q.screen.gt.md ? 'flex-basis: 48%; ' : 'width: 100%'">
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar><img :src="post.icon" /></q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-bold">{{ post.name }}</q-item-label>
                        <q-item-label caption>{{ post.sub_caption }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-img :src="post.imageUrl" />
                    <q-card-section>
                      <div>{{ post.caption }}</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                      <q-chip size="sm" v-for="(item, index) in post.tech" :key="index">{{ item }}</q-chip>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                      <q-btn color="black" dense flat icon="mdi-github" :size="$q.screen.gt.sm ? 'md' : 'sm'"
                        target="_blank" no-caps :href="post.github_url" v-if="post.github_url" />
                      <q-btn color="primary" dense flat icon="mdi-web" outline :size="$q.screen.gt.sm ? 'md' : 'sm'"
                        target="_blank" :href="post.url" v-if="post.url" />
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-tab-panel>

            <!-- Experience tab -->
            <q-tab-panel name="experiences">
              <div class="q-pa-sm">
                <div :class="$q.screen.gt.md ? 'row items-stretch justify-left' : 'column items-start'" class="q-mt-md">
                  <div v-if="loading" class="row full-width">
                    <q-card flat bordered :style="$q.screen.gt.md ? 'flex-basis: 48%;' : 'width: 100%'" v-for="i in 6"
                      :key="i">
                      <q-item>
                        <q-item-section>
                          <q-item-label><q-skeleton type="text" animation="fade" /></q-item-label>
                          <q-item-label caption><q-skeleton type="text" animation="fade" /></q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-skeleton height="200px" square animation="fade" />
                      <q-card-section>
                        <q-skeleton type="text" class="text-subtitle2" animation="fade" />
                        <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
                      </q-card-section>
                    </q-card>
                  </div>

                  <q-card v-else v-for="post in experiences" :key="post.id" bordered rounded style="border-radius: 20px"
                    class="q-my-sm q-mr-md" :style="$q.screen.gt.md ? 'flex-basis: 48%' : 'width: 100%'">
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-bold">{{ post.name }}</q-item-label>
                        <q-item-label caption>{{ post.sub_caption }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-img :src="post.imageUrl" />
                    <q-card-section>
                      <div>{{ post.caption }}</div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>


        </div>
      </div>

    </q-card>

  </q-page>
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
// const getAllTech = async () =>{
//   // $q.loading.show();
//   api.get('/api/v1/tech-stacks')
//   .then(response =>{
//     console.log(response);
//     setTimeout(() =>{

//       techs.value = response.data;
//       // $q.loading.hide();
//     }, 300)
//   }).catch(error =>{
//     console.log(error)
//   });
// }
// const getAllProject = async () =>{
//   // $q.loading.show();
//   api.get('/api/v1/projects')
//   .then(response =>{
//     console.log(response);
//     setTimeout(() =>{

//       posts.value = response.data;
//       // $q.loading.hide();
//     }, 300)
//   }).catch(error =>{
//     console.log(error)
//   });
// }
// const getAllExperience = async () =>{
//   $q.loading.show();
//   api.get('/api/v1/experiences')
//   .then(response =>{
//     console.log(response);
//     setTimeout(() =>{

//       experiences.value = response.data;
//       $q.loading.hide();
//     }, 300)
//   }).catch(error =>{
//     console.log(error)
//   });
// }

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
onMounted(() => {
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
</style>
