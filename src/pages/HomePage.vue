<template>
  <q-page class="constrain q-pa-md">
    <HeaderPart />
    <template v-if="!isClosed">
      <template v-if="!isMinimized">
        <q-card class="no-shadow bg-transparent q-mt-xl">
          <div
            class="column full-body-table"
            style="border-left: 1px solid #000; border-top: 1px solid #000"
          >
            <!-- Row 1 with 1 col -->
            <div
              style="
                border-right: 1px solid #000;
                border-bottom: 1px solid #000;
              "
            >
              <q-toolbar class="">
                <q-toolbar-title> </q-toolbar-title>
                <q-btn
                  flat
                  round
                  dense
                  :icon="
                    isMinimized ? 'mdi-arrow-expand' : 'mdi-window-minimize'
                  "
                  size="sm"
                  @click="isMinimized = !isMinimized"
                />

                <q-btn
                  flat
                  round
                  dense
                  :icon="
                    $q.fullscreen.isActive
                      ? 'mdi-dock-window'
                      : 'mdi-window-maximize'
                  "
                  @click="$q.fullscreen.toggle()"
                  size="sm"
                />
                <q-btn
                  flat
                  round
                  dense
                  icon="mdi-window-close"
                  size="sm"
                  @click="isClosed = true"
                />
              </q-toolbar>
            </div>

            <!-- Row 2 with 2 cols -->
            <div class="row items-stretch">
              <div
                class="col-4 preview"
                v-if="$q.screen.gt.sm"
                style="
                  border-right: 1px solid #000;
                  border-bottom: 1px solid #000;
                  padding: 16px;
                "
              >
                <div v-if="previewData">
                  <div class="text-h6 text-bold q-mb-sm">
                    {{ previewData.name }}
                  </div>
                  <div class="text-caption text-grey q-mb-sm">
                    {{ previewData.sub_caption }}
                  </div>
                  <q-img :src="previewData.imageUrl" class="q-mb-sm" />

                  <q-card-section class="q-pa-none">
                    <p>{{ previewData.caption }}</p>
                  </q-card-section>

                  <div class="q-mt-sm">
                    <q-chip
                      v-for="(tech, i) in previewData.tech"
                      :key="i"
                      size="sm"
                      class="q-mr-xs"
                    >
                      {{ tech }}
                    </q-chip>
                  </div>

                  <div class="q-mt-md">
                    <q-btn
                      v-if="previewData.github_url"
                      icon="mdi-github"
                      flat
                      dense
                      color="black"
                      :href="previewData.github_url"
                      target="_blank"
                      class="q-mr-sm"
                    />
                    <q-btn
                      v-if="previewData.url"
                      icon="mdi-web"
                      flat
                      dense
                      color="primary"
                      :href="previewData.url"
                      target="_blank"
                    />
                  </div>
                </div>
                <div v-else class="text-black about-placeholder q-pa-sm">
                  <p
                    v-if="userStore.userData.title"
                    class="text-h6 text-weight-bold q-mb-xs"
                    v-html="userStore.userData.title"
                  ></p>
                  <template v-if="userStore.userData.about">
                    <div
                      class="text-body1 about-html"
                      :class="{
                        'about-excerpt-clamp': hasAboutMore && !aboutExpanded,
                      }"
                      :style="
                        hasAboutMore && !aboutExpanded
                          ? { maxHeight: aboutExcerptMaxHeight }
                          : {}
                      "
                      v-html="userStore.userData.about"
                    ></div>
                    <q-btn
                      v-if="hasAboutMore && !aboutExpanded"
                      flat
                      dense
                      no-caps
                      color="primary"
                      label="Read more"
                      size="sm"
                      class="q-pa-none q-mt-xs"
                      @click="aboutExpanded = true"
                    />
                    <q-btn
                      v-if="hasAboutMore && aboutExpanded"
                      flat
                      dense
                      no-caps
                      color="primary"
                      label="Read less"
                      size="sm"
                      class="q-pa-none q-mt-xs"
                      @click="aboutExpanded = false"
                    />
                  </template>
                  <div v-else class="text-body1 text-grey-6">
                    <p class="q-mb-xs">No about information available yet.</p>
                  </div>
                </div>
              </div>

              <div
                class="col"
                style="
                  border-right: 1px solid #000;
                  border-bottom: 1px solid #000;
                  padding: 16px;
                "
              >
                <!-- Row 2 - Column 2 -->
                <div class="col col-sm-8 q-pt-md">
                  <q-tabs v-model="tab" align="left" narrow-indicator dense>
                    <q-tab name="about" label="About" v-if="!$q.screen.gt.sm" />
                    <q-tab
                      v-for="type in projectTypes"
                      :key="type"
                      :name="type"
                      :label="`${type}`"
                    />
                    <q-tab name="experiences" label="Experiences" />
                    <q-tab
                      v-if="showReviewsTab"
                      name="reviews"
                      label="Reviews"
                    />
                  </q-tabs>

                  <q-tab-panels
                    v-model="tab"
                    animated
                    transition-prev="fade"
                    transition-next="fade"
                    class="bg-transparent text-black"
                  >
                    <q-tab-panel
                      v-for="type in projectTypes"
                      :key="type"
                      :name="type"
                    >
                      <div class="q-pa-sm">
                        <div
                          :class="
                            $q.screen.gt.md
                              ? 'row items-stretch justify-left'
                              : 'column items-start'
                          "
                          class="q-mt-md"
                        >
                          <template v-if="loading">
                            <q-card
                              v-for="i in 6"
                              :key="i"
                              flat
                              bordered
                              class="q-my-sm q-mr-md"
                              :style="
                                $q.screen.gt.md
                                  ? 'flex-basis: 30%;'
                                  : 'width: 100%'
                              "
                            >
                              <q-item>
                                <q-item-section avatar>
                                  <q-skeleton type="QAvatar" animation="fade" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label
                                    ><q-skeleton type="text" animation="fade"
                                  /></q-item-label>
                                  <q-item-label caption
                                    ><q-skeleton type="text" animation="fade"
                                  /></q-item-label>
                                </q-item-section>
                              </q-item>
                              <q-skeleton
                                height="140px"
                                square
                                animation="fade"
                              />
                              <q-card-section>
                                <q-skeleton
                                  type="text"
                                  class="text-subtitle2"
                                  animation="fade"
                                />
                                <q-skeleton
                                  type="text"
                                  width="50%"
                                  class="text-subtitle2"
                                  animation="fade"
                                />
                              </q-card-section>
                            </q-card>
                          </template>
                          <q-card
                            v-else
                            v-for="post in posts.filter((p) =>
                              (p.type || []).includes(type)
                            )"
                            :key="post.id"
                            bordered
                            class="q-my-sm q-mr-md"
                            :style="
                              $q.screen.gt.md
                                ? 'flex-basis: 30%; '
                                : 'width: 100%'
                            "
                            v-ripple
                            style="cursor: pointer"
                            @click="
                              $q.screen.gt.sm
                                ? previewProject(post)
                                : previewProjectMobile(post)
                            "
                          >
                            <q-item>
                              <q-item-section>
                                <q-item-label class="text-bold">{{
                                  post.name
                                }}</q-item-label>
                                <q-item-label caption>{{
                                  post.sub_caption
                                }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-card>
                        </div>
                      </div>
                    </q-tab-panel>

                    <!-- Experience tab -->
                    <q-tab-panel name="experiences">
                      <div class="q-pa-sm">
                        <div
                          :class="
                            $q.screen.gt.md
                              ? 'row items-stretch justify-left'
                              : 'column items-start'
                          "
                          class="q-mt-md"
                        >
                          <template v-if="loading">
                            <q-card
                              v-for="i in 6"
                              :key="i"
                              flat
                              bordered
                              class="q-my-sm q-mr-md"
                              :style="
                                $q.screen.gt.md
                                  ? 'flex-basis: 30%;'
                                  : 'width: 100%'
                              "
                            >
                              <q-item>
                                <q-item-section>
                                  <q-item-label
                                    ><q-skeleton type="text" animation="fade"
                                  /></q-item-label>
                                  <q-item-label caption
                                    ><q-skeleton type="text" animation="fade"
                                  /></q-item-label>
                                </q-item-section>
                              </q-item>
                              <q-skeleton
                                height="140px"
                                square
                                animation="fade"
                              />
                              <q-card-section>
                                <q-skeleton
                                  type="text"
                                  class="text-subtitle2"
                                  animation="fade"
                                />
                                <q-skeleton
                                  type="text"
                                  width="50%"
                                  class="text-subtitle2"
                                  animation="fade"
                                />
                              </q-card-section>
                            </q-card>
                          </template>
                          <q-card
                            v-else
                            v-for="post in experiences"
                            :key="post.id"
                            bordered
                            rounded
                            class="q-my-sm q-mr-md"
                            :style="
                              $q.screen.gt.md
                                ? 'flex-basis: 30%'
                                : 'width: 100%'
                            "
                            v-ripple
                            @click="
                              $q.screen.gt.sm
                                ? previewProject(post)
                                : previewProjectMobile(post)
                            "
                            style="cursor: pointer"
                          >
                            <q-item>
                              <q-item-section>
                                <q-item-label class="text-bold">{{
                                  post.name
                                }}</q-item-label>
                                <q-item-label caption>{{
                                  post.sub_caption
                                }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-card>
                        </div>
                      </div>
                    </q-tab-panel>

                    <!-- Reviews tab (only when approved_count >= minimum_reviews_to_display) -->
                    <q-tab-panel v-if="showReviewsTab" name="reviews">
                      <div class="q-pa-sm">
                        <template v-if="showReviewsTab && reviews.length > 0">
                          <div class="row reviews-row q-mt-md">
                            <div
                              v-for="review in reviews"
                              :key="review.id"
                              class="col-12 col-md-6 review-card-col"
                            >
                              <q-card bordered class="q-pa-md review-card">
                              <q-item class="q-pa-none">
                                <q-item-section>
                                  <q-item-label class="text-bold">{{
                                    review.client_name
                                  }}</q-item-label>
                                  <q-item-label
                                    v-if="review.client_title"
                                    caption
                                    class="q-mb-sm"
                                  >
                                    {{ review.client_title }}
                                  </q-item-label>
                                  <div class="q-mb-sm">
                                    <q-icon
                                      v-for="n in 5"
                                      :key="n"
                                      :name="
                                        n <= review.rating
                                          ? 'star'
                                          : 'star_border'
                                      "
                                      size="sm"
                                      :color="
                                        n <= review.rating ? 'amber' : 'grey'
                                      "
                                    />
                                  </div>
                                  <p class="text-body2 q-my-none">
                                    {{ review.message }}
                                  </p>
                                  <q-btn
                                    v-if="review.client_linkedin_url"
                                    flat
                                    dense
                                    no-caps
                                    color="primary"
                                    icon="mdi-linkedin"
                                    :href="review.client_linkedin_url"
                                    target="_blank"
                                    size="sm"
                                    class="q-mt-sm"
                                  >
                                    LinkedIn
                                  </q-btn>
                                </q-item-section>
                              </q-item>
                              </q-card>
                            </div>
                          </div>
                        </template>
                        <template v-else>
                          <p class="text-body2 text-grey-7 q-mt-md">
                            {{
                              showReviewsTab
                                ? "No reviews yet."
                                : 'Reviews will appear here once there are enough approved reviews. If you added reviews in the dashboard, set their status to "Approved" (or set Minimum reviews to display to 0 in Settings).'
                            }}
                          </p>
                        </template>
                        <q-btn
                          outline
                          color="primary"
                          label="Submit a review"
                          icon="mdi-pencil"
                          class="q-mt-xl"
                          style="margin-left: -15px"
                          @click="showSubmitReviewDialog = true"
                        />
                      </div>
                    </q-tab-panel>

                    <!-- About tab -->
                    <q-tab-panel name="about">
                      <div class="q-pa-sm">
                        <div
                          :class="
                            $q.screen.gt.md
                              ? 'row items-stretch justify-left'
                              : 'column items-start'
                          "
                          class="q-mt-md"
                        >
                          <q-card
                            :style="
                              $q.screen.gt.md
                                ? 'flex-basis: 50%'
                                : 'width: 100%'
                            "
                          >
                            <q-item>
                              <q-item-section>
                                <p
                                  v-if="userStore.userData.title"
                                  class="text-h6 text-weight-bold q-mb-xs"
                                  v-html="userStore.userData.title"
                                ></p>
                                <template v-if="userStore.userData.about">
                                  <div
                                    class="text-body1 about-html"
                                    :class="{
                                      'about-excerpt-clamp':
                                        hasAboutMore && !aboutExpanded,
                                    }"
                                    :style="
                                      hasAboutMore && !aboutExpanded
                                        ? { maxHeight: aboutExcerptMaxHeight }
                                        : {}
                                    "
                                    v-html="userStore.userData.about"
                                  ></div>
                                  <q-btn
                                    v-if="hasAboutMore && !aboutExpanded"
                                    flat
                                    dense
                                    no-caps
                                    color="primary"
                                    label="Read more"
                                    size="sm"
                                    class="q-pa-none q-mt-xs"
                                    @click="aboutExpanded = true"
                                  />
                                  <q-btn
                                    v-if="hasAboutMore && aboutExpanded"
                                    flat
                                    dense
                                    no-caps
                                    color="primary"
                                    label="Read less"
                                    size="sm"
                                    class="q-pa-none q-mt-xs"
                                    @click="aboutExpanded = false"
                                  />
                                </template>
                                <div v-else class="text-body1 text-grey-6">
                                  <p class="q-mb-xs">
                                    No about information available yet.
                                  </p>
                                </div>
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
        <div
          class="q-pa-md row items-center justify-between q-mt-xl"
          style="border: 1px solid #000"
        >
          <div
            class="text-bold"
            @click="isMinimized = false"
            style="cursor: pointer"
          >
            <q-img
              src="/images/janlord.png"
              width="30px"
              style="cursor: pointer"
              @click="isClosed = false"
            />
            Minimized View
          </div>
          <q-btn
            flat
            dense
            size="sm"
            icon="mdi-arrow-expand"
            @click="isMinimized = false"
            class="q-ml-sm"
          />
        </div>
      </template>
    </template>
    <template v-else>
      <div class="restore-container">
        <!-- <q-btn round color="primary" icon="mdi-arrow-expand" size="lg" /> -->
        <!-- <p style="display: block;" class="full-width">Click the icon to open</p> -->

        <q-avatar size="100px" class="q-mr-sm q-mb-sm" color="white">
          <q-img
            src="/images/janlord.png"
            width="100px"
            style="cursor: pointer"
            @click="isClosed = false"
          />
          <q-tooltip
            anchor="top middle"
            self="center middle"
            class="bg-primary"
          >
            CLICK TO OPEN
          </q-tooltip>
        </q-avatar>
      </div>
    </template>

    <q-dialog persistent v-model="showPreview">
      <q-card class="my-card" style="min-width: 200px">
        <q-toolbar class="bg-grey-7 text-white">
          <q-toolbar-title> Preview </q-toolbar-title>
          <q-btn flat round dense icon="close" size="sm" v-close-popup />
        </q-toolbar>
        <q-card-section class="q-pa-md">
          <div class="text-h6 text-bold q-mb-sm">{{ previewData.name }}</div>
          <div class="text-caption text-grey q-mb-sm">
            {{ previewData.sub_caption }}
          </div>
          <q-img :src="previewData.imageUrl" class="q-mb-sm" />

          <q-card-section class="q-pa-none">
            <p>{{ previewData.caption }}</p>
          </q-card-section>

          <div class="q-mt-sm">
            <q-chip
              v-for="(tech, i) in previewData.tech"
              :key="i"
              size="sm"
              class="q-mr-xs"
            >
              {{ tech }}
            </q-chip>
          </div>

          <div class="q-mt-md">
            <q-btn
              v-if="previewData.github_url"
              icon="mdi-github"
              flat
              dense
              color="black"
              :href="previewData.github_url"
              target="_blank"
              class="q-mr-sm"
            />
            <q-btn
              v-if="previewData.url"
              icon="mdi-web"
              flat
              dense
              color="primary"
              :href="previewData.url"
              target="_blank"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Submit Review Dialog -->
    <q-dialog
      v-model="showSubmitReviewDialog"
      persistent
      :maximized="$q.screen.lt.md"
      :transition-show="slideUpTransition"
      :transition-hide="slideDownTransition"
    >
      <q-card style="min-width: 320px; max-width: 500px" class="q-pa-md">
        <q-card-section>
          <div class="text-h6">Submit a review</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit.prevent="onSubmitReview" class="q-gutter-md">
            <q-input
              v-model="reviewForm.client_name"
              label="Your name *"
              outlined
              dense
              :rules="[(v) => !!v || 'Required']"
            />
            <q-input
              v-model="reviewForm.business_email"
              label="Business email *"
              type="email"
              outlined
              dense
              :rules="[
                (v) => !!v || 'Required',
                (v) => /.+@.+\..+/.test(v) || 'Invalid email',
              ]"
            />
            <q-input
              v-model="reviewForm.client_title"
              label="Your title (optional)"
              outlined
              dense
            />
            <q-input
              v-model="reviewForm.client_linkedin_url"
              label="LinkedIn URL (optional)"
              outlined
              dense
            />
            <q-input
              v-model="reviewForm.message"
              label="Your message *"
              type="textarea"
              outlined
              dense
              rows="4"
              :rules="[(v) => !!v || 'Required']"
            />
            <div>
              <span class="text-caption q-mr-sm">Rating *</span>
              <q-rating
                v-model="reviewForm.rating"
                :max="5"
                size="1.5em"
                color="amber"
                icon="star_border"
                icon-selected="star"
              />
            </div>
            <div class="row justify-end q-gutter-sm">
              <q-btn flat label="Cancel" color="grey" v-close-popup />
              <q-btn
                type="submit"
                label="Submit"
                color="primary"
                :loading="submittingReview"
              />
            </div>
          </q-form>
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
const tab = ref("website");
const $q = useQuasar();
const newToken = ref(LocalStorage.getItem("jwt"));
defineOptions({
  name: "PageHome",
});
const loading = ref(true);
const posts = ref([]);
const postApps = ref([]);
const postWebs = ref([]);
// Get unique types from fetched projects
const projectTypes = ref([]);

const experiences = ref([]);
const techs = ref([]);

const reviews = ref([]);
const approvedReviewCount = ref(0);
const minimumReviewsToDisplay = ref(0);

const showReviewsTab = computed(() => {
  const min = minimumReviewsToDisplay.value;
  const count = approvedReviewCount.value;
  if (min === 0) return count >= 1;
  return count >= min;
});

const showSubmitReviewDialog = ref(false);
const submittingReview = ref(false);
const reviewForm = ref({
  client_name: "",
  business_email: "",
  client_linkedin_url: "",
  client_title: "",
  message: "",
  rating: 3,
});

const ABOUT_EXCERPT_LENGTH = 800;
// Fetch data from APIs with loading simulation
const getAllData = async () => {
  try {
    const [projects, experiencesData, techsData, reviewsData] =
      await Promise.all([
        api.get("/api/v1/projects"),
        api.get("/api/v1/experiences"),
        api.get("/api/v1/tech-stacks"),
        api.get("/api/v1/reviews").catch(() => ({
          data: {
            reviews: [],
            approved_count: 0,
            minimum_reviews_to_display: 0,
          },
        })),
      ]);

    posts.value = projects.data.projects;
    experiences.value = experiencesData.data;
    techs.value = techsData.data;
    reviews.value = reviewsData.data.reviews || [];
    approvedReviewCount.value = reviewsData.data.approved_count ?? 0;
    minimumReviewsToDisplay.value =
      reviewsData.data.minimum_reviews_to_display ?? 0;
    loading.value = false;

    // If Reviews tab is visible (minimum_reviews_to_display satisfied), make it the default active tab
    const min = minimumReviewsToDisplay.value;
    const count = approvedReviewCount.value;
    const reviewsTabVisible = min === 0 ? count >= 1 : count >= min;
    if (reviewsTabVisible) {
      tab.value = "reviews";
    }

    // Extract types
    const allTypes = posts.value.flatMap((p) => p.type || []);
    projectTypes.value = [...new Set(allTypes)]; // Remove duplicates
  } catch (error) {
    console.error(error);
  }
};

const onSubmitReview = async () => {
  submittingReview.value = true;
  try {
    const res = await api.post("/api/v1/reviews", {
      client_name: reviewForm.value.client_name,
      business_email: reviewForm.value.business_email,
      client_linkedin_url: reviewForm.value.client_linkedin_url || undefined,
      client_title: reviewForm.value.client_title || undefined,
      message: reviewForm.value.message,
      rating: reviewForm.value.rating,
    });
    if (res.data.status === 200) {
      $q.notify({
        type: "positive",
        message:
          res.data.message ||
          "Review submitted. It will appear after approval.",
      });
      showSubmitReviewDialog.value = false;
      reviewForm.value = {
        client_name: "",
        business_email: "",
        client_linkedin_url: "",
        client_title: "",
        message: "",
        rating: 3,
      };
    } else {
      $q.notify({
        type: "negative",
        message: res.data.message || "Failed to submit.",
      });
    }
  } catch (err) {
    const msg =
      err.response?.data?.message || err.message || "Failed to submit review.";
    $q.notify({ type: "negative", message: msg });
  } finally {
    submittingReview.value = false;
  }
};
const previewData = ref(null);
const showPreview = ref(false);

const previewProject = (post) => {
  previewData.value = post;
};
const previewProjectMobile = (post) => {
  showPreview.value = true;
  previewData.value = post;
};
const isMinimized = ref(false);
const isClosed = ref(false);
const aboutExpanded = ref(false);

const aboutPlainText = computed(() => {
  const html = userStore.userData?.about || "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
});
const hasAboutMore = computed(
  () => aboutPlainText.value.length > ABOUT_EXCERPT_LENGTH
);

// Approximate height so ~ABOUT_EXCERPT_LENGTH chars are visible (~50 chars per line, ~1.5em per line)
const aboutExcerptMaxHeight = computed(() => {
  const lines = ABOUT_EXCERPT_LENGTH / 50;
  const em = Math.max(8, Math.ceil(lines * 1.6));
  return `${em}em`;
});

onMounted(() => {
  if ($q.screen.gt.sm) {
    tab.value = "website";
  } else {
    tab.value = "about";
  }
  settingStore.getSetting();
  userStore.getUserData();
  getAllData();
  // getAllTech();
  // getAllProject();
  // getAllExperience();
  setTimeout(() => {
    settingStore.changeThemeColor();
  }, 100);
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

.about-placeholder p {
  margin-bottom: 0.5rem;
}

.about-placeholder :deep(p) {
  margin-bottom: 0.5rem;
}

.about-html :deep(p) {
  margin-bottom: 0.5rem;
}

.about-excerpt-clamp {
  overflow: hidden;
  position: relative;
  /* max-height set inline from aboutExcerptMaxHeight so it scales with ABOUT_EXCERPT_LENGTH */
}

.about-excerpt-clamp::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2em;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--q-color-page-bg, white)
  );
  pointer-events: none;
}

.reviews-row {
  margin: -8px;
}

.review-card-col {
  padding: 8px;
}

.review-card {
  margin-bottom: 16px;
}
</style>
