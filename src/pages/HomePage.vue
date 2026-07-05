<template>
  <q-page class="constrain home-page q-pa-md">
    <HeaderPart />
    <template v-if="!isClosed">
      <template v-if="!isMinimized">
        <q-card class="no-shadow bg-transparent q-mt-xl">
          <!-- q--avoid-card-border: QCard strips borders on direct div children -->
          <div
            class="column full-body-table frame-top-left q--avoid-card-border"
          >
            <!-- Row 1 with 1 col -->
            <div class="frame-cell">
              <q-toolbar class="">
                <q-toolbar-title> </q-toolbar-title>
                <q-btn
                  flat
                  round
                  dense
                  :icon="
                    isMinimized ? 'mdi-arrow-expand' : 'mdi-window-minimize'
                  "
                  :aria-label="
                    isMinimized ? 'Restore window' : 'Minimize window'
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
                  :aria-label="
                    $q.fullscreen.isActive
                      ? 'Exit fullscreen'
                      : 'Enter fullscreen'
                  "
                  @click="$q.fullscreen.toggle()"
                  size="sm"
                />
                <q-btn
                  flat
                  round
                  dense
                  icon="mdi-window-close"
                  aria-label="Close window"
                  size="sm"
                  @click="isClosed = true"
                />
              </q-toolbar>
            </div>

            <!-- Row 2 with 2 cols -->
            <div class="row items-stretch">
              <div
                class="col-4 preview frame-cell q-pa-md"
                v-if="$q.screen.gt.sm"
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

              <div class="col home-content-col frame-cell q-pa-md">
                <!-- Row 2 - Column 2 -->
                <div class="col col-sm-8 q-pt-md home-tabs-section">
                  <div class="home-tabs-wrapper">
                    <q-tabs
                      v-model="tab"
                      align="left"
                      narrow-indicator
                      dense
                      class="home-tabs"
                      active-color="primary"
                      indicator-color="primary"
                    >
                      <q-tab
                        name="about"
                        :label="tabLabel('about', 'About')"
                        v-if="!$q.screen.gt.sm"
                      />
                      <q-tab
                        v-for="type in projectTypes"
                        :key="type"
                        :name="type"
                        :label="tabLabel(type, type)"
                      />
                      <q-tab
                        name="experiences"
                        :label="tabLabel('experiences', 'Experiences')"
                      />
                      <q-tab
                        v-if="showReviewsTab"
                        name="reviews"
                        :label="tabLabel('reviews', 'Reviews')"
                      />
                    </q-tabs>
                  </div>

                  <q-tab-panels
                    v-model="tab"
                    animated
                    transition-prev="fade"
                    transition-next="fade"
                    class="bg-transparent text-black home-tab-panels"
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
                              : 'tab-cards-wrap tab-cards-mobile'
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
                            class="q-my-sm q-mr-md tab-detail-card"
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
                            <div v-if="displayCardImages" class="tab-card-img-wrap">
                              <img
                                v-if="post.imageUrl || post.icon"
                                :src="post.imageUrl || post.icon"
                                class="tab-card-img"
                                :alt="post.name"
                                loading="lazy"
                                decoding="async"
                              />
                              <div
                                v-else
                                class="tab-card-img tab-card-img-placeholder"
                              />
                              <div class="tab-card-img-hover">
                                <q-icon name="mdi-open-in-new" size="32px" />
                              </div>
                            </div>
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
                              : 'tab-cards-wrap tab-cards-mobile'
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
                            class="q-my-sm q-mr-md tab-detail-card"
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
                            <div v-if="displayCardImages" class="tab-card-img-wrap">
                              <img
                                v-if="post.imageUrl || post.icon"
                                :src="post.imageUrl || post.icon"
                                class="tab-card-img"
                                :alt="post.name"
                                loading="lazy"
                                decoding="async"
                              />
                              <div
                                v-else
                                class="tab-card-img tab-card-img-placeholder"
                              />
                              <div class="tab-card-img-hover">
                                <q-icon name="mdi-open-in-new" size="32px" />
                              </div>
                            </div>
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
                    <q-tab-panel
                      v-if="showReviewsTab"
                      name="reviews"
                      class="reviews-tab-panel"
                    >
                      <div class="q-pa-sm reviews-tab-content">
                        <q-btn
                          outline
                          color="primary"
                          label="Submit a review"
                          icon="mdi-pencil"
                          class="q-mt-md submit-review-btn"
                          @click="showSubmitReviewDialog = true"
                        />
                        <template v-if="showReviewsTab && reviews.length > 0">
                          <div class="reviews-row q-mt-md">
                            <div
                              v-for="review in reviews"
                              :key="review.id"
                              class="review-card-col"
                            >
                              <q-card bordered class="q-pa-md review-card">
                                <q-item class="q-pa-none">
                                  <q-item-section class="review-card-content">
                                    <q-item-label
                                      class="text-bold review-name"
                                      >{{ review.client_name }}</q-item-label
                                    >
                                    <q-item-label
                                      v-if="review.client_title"
                                      caption
                                      class="q-mb-sm review-title"
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
                                    <p
                                      class="text-body2 q-my-none review-message"
                                    >
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
                            No reviews yet.
                          </p>
                        </template>
                        <q-btn
                          outline
                          color="primary"
                          label="Submit a review"
                          icon="mdi-pencil"
                          class="q-mt-md submit-review-btn"
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
          class="q-pa-md row items-center justify-between q-mt-xl frame-all"
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
            aria-label="Restore window"
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
          <q-btn
            flat
            round
            dense
            icon="close"
            aria-label="Close preview"
            size="sm"
            v-close-popup
          />
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
              aria-label="View source on GitHub"
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
              aria-label="Visit live site"
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
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
  nextTick,
} from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useSettingsStore } from "src/stores/settings/settingStore";
import { useUserStore } from "src/stores/user/userStore";
import HeaderPart from "src/components/HeaderPart.vue";

const settingStore = useSettingsStore();
const userStore = useUserStore();
const tab = ref("website");
const $q = useQuasar();
defineOptions({
  name: "PageHome",
});
const loading = ref(true);
const posts = ref([]);
// Get unique types from fetched projects
const projectTypes = ref([]);

const experiences = ref([]);

const reviews = ref([]);
const approvedReviewCount = ref(0);
const minimumReviewsToDisplay = ref(0);

const showReviewsTab = computed(() => {
  const min = minimumReviewsToDisplay.value;
  const count = approvedReviewCount.value;
  if (min === 0) return count >= 1;
  return count >= min;
});

const displayCardImages = computed(
  () => settingStore.settingsData?.display_card_images !== false
);

// Short tab labels for narrow screens (< 450px) so all tabs fit
const narrowTabs = ref(false);
const tabLabel = (name, fullLabel) => {
  if (!narrowTabs.value) return fullLabel;
  const short = {
    about: "About",
    website: "Web",
    app: "App",
    experiences: "Exp",
    reviews: "Reviews",
  };
  return (
    short[name] ?? (fullLabel.length > 6 ? fullLabel.slice(0, 6) : fullLabel)
  );
};

const showSubmitReviewDialog = ref(false);
const slideUpTransition = "slide-up";
const slideDownTransition = "slide-down";
const submittingReview = ref(false);
const reviewForm = ref({
  client_name: "",
  business_email: "",
  client_linkedin_url: "",
  client_title: "",
  message: "",
  rating: 5,
});

const ABOUT_EXCERPT_LENGTH = 800;
// Fetch data from APIs with loading simulation
const getAllData = async () => {
  try {
    const [projects, experiencesData, reviewsData] = await Promise.all([
      api.get("/api/v1/projects"),
      api.get("/api/v1/experiences"),
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
        rating: 5,
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

const setNarrowTabs = () => {
  narrowTabs.value = typeof window !== "undefined" && window.innerWidth < 450;
};

// Keep last scroll position so we can restore it when switching tabs on mobile (prevents jump to top)
const lastScrollY = ref(0);
const onScroll = () => {
  lastScrollY.value = window.scrollY;
};

watch(tab, async () => {
  if ($q.screen.gt.sm) return;
  const y = lastScrollY.value;
  await nextTick();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, y);
    });
  });
});

onMounted(() => {
  setNarrowTabs();
  window.addEventListener("resize", setNarrowTabs);
  window.addEventListener("scroll", onScroll, { passive: true });
  if ($q.screen.gt.sm) {
    tab.value = "website";
  } else {
    tab.value = "about";
  }
  // Settings and user data are loaded once by MainLayout
  getAllData();
});

onUnmounted(() => {
  window.removeEventListener("resize", setNarrowTabs);
  window.removeEventListener("scroll", onScroll);
});
</script>

<style lang="css">
/* Shared layout classes (.constrain, .frame-*, .shared-border*) live in src/css/app.scss */

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

/* Flex children must never exceed the window frame; without this the tabs'
   max-content width propagates up and clips the toolbar on narrow screens */
.full-body-table > div {
  max-width: 100%;
  min-width: 0;
}

.about-placeholder {
  line-height: 1.5;
}

.about-placeholder p {
  margin-bottom: 0.5rem;
}

.about-html p {
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

/* Float-left style: 2 columns on desktop, cards flow top-to-bottom per column, same margin-bottom */
.reviews-row {
  column-count: 2;
  column-gap: 16px;
  margin-bottom: 0;
}

.review-card-col {
  break-inside: avoid;
  margin-bottom: 16px;
  width: 100%;
}

.review-card {
  width: 100%;
}

/* Prevent overflow: allow text to wrap */
.review-card-content,
.review-name,
.review-title,
.review-message {
  min-width: 0;
  overflow-wrap: break-word;
  word-break: break-word;
}

.review-card .review-message {
  max-width: 100%;
}

/* Website / App / Experiences tab cards: same-size image; crop sides, no scroll */
.tab-card-img-wrap {
  height: 160px;
  width: 100%;
  max-width: 100%;
  overflow: hidden !important;
  flex-shrink: 0;
  min-width: 0;
  position: relative;
}

.tab-card-img-wrap .tab-card-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  transform: scale(1.1);
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.tab-card-img-wrap:hover .tab-card-img {
  opacity: 0.95;
}

.tab-card-img-wrap .tab-card-img-placeholder {
  width: 100%;
  height: 100%;
  display: block;
  opacity: 0.82;
}

/* Hover overlay: icon link */
.tab-card-img-hover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.tab-card-img-wrap:hover .tab-card-img-hover {
  opacity: 1;
}

.tab-card-img-placeholder {
  background: rgba(0, 0, 0, 0.06);
}

/* Card clips image so no scrollbar */
.tab-detail-card {
  overflow: hidden;
}

/* Mobile: tab cards = 1 column, multiple rows (one card per row) */
.tab-cards-wrap.tab-cards-mobile {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.tab-cards-wrap.tab-cards-mobile .tab-detail-card,
.tab-cards-wrap.tab-cards-mobile .q-card {
  width: 100% !important;
  max-width: 100%;
  flex: 0 0 auto;
}

/* Mobile: fix overflow on tabs and review section */
@media (max-width: 599px) {
  .home-page {
    padding-left: 12px !important;
    padding-right: 12px !important;
    padding-top: 12px !important;
    padding-bottom: 24px !important;
    overflow-x: hidden;
    max-width: 100vw;
    box-sizing: border-box;
  }

  .home-page * {
    box-sizing: border-box;
  }

  .home-page .full-body-table {
    border-left-width: 1px;
    min-width: 0;
  }

  .home-page .row.items-stretch {
    min-width: 0;
  }

  .home-content-col {
    padding: 12px 8px !important;
    min-width: 0;
    max-width: 100%;
    overflow-x: hidden;
  }

  .home-tabs-section {
    padding-left: 0;
    padding-right: 0;
    min-width: 0;
    max-width: 100%;
    margin-bottom: 8px;
  }

  /* Tabs: scroll horizontally so "Reviews" is never cut off */
  .home-tabs-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    margin-left: -8px;
    margin-right: -8px;
    padding: 4px 8px 8px;
    width: 100%;
    max-width: 100%;
  }

  .home-tabs-wrapper::-webkit-scrollbar {
    height: 6px;
  }

  .home-tabs-wrapper::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  .home-tabs {
    width: max-content;
    min-width: max-content;
    flex-shrink: 0;
  }

  .home-tabs .q-tabs__content {
    flex-wrap: nowrap;
  }

  .home-tabs .q-tab {
    flex-shrink: 0;
    min-width: auto;
    padding-left: 14px;
    padding-right: 14px;
    font-size: 0.8125rem;
  }

  .home-tab-panels {
    min-width: 0;
    overflow: hidden;
  }

  .home-tab-panels .q-panel {
    min-width: 0;
    overflow-x: hidden;
  }

  .home-tab-panels .q-panel .q-pa-sm {
    padding-left: 4px;
    padding-right: 4px;
  }

  .submit-review-btn {
    margin-left: 0;
    margin-top: 16px;
  }

  /* Reviews tab panel */
  .reviews-tab-panel {
    min-width: 0;
    overflow: hidden;
  }

  .reviews-tab-content {
    min-width: 0;
    max-width: 100%;
    overflow-x: hidden;
    padding-left: 4px;
    padding-right: 4px;
  }

  .reviews-row {
    column-count: 1;
    min-width: 0;
    max-width: 100%;
  }

  .review-card-col {
    min-width: 0;
    max-width: 100%;
  }

  .review-card {
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
  }

  .review-card .q-item__section {
    min-width: 0;
    overflow: hidden;
  }
}

/* Extra narrow: below 450px - tabs and review cards sized to fit */
@media (max-width: 450px) {
  .home-page {
    padding-left: 10px !important;
    padding-right: 10px !important;
    padding-top: 10px !important;
    padding-bottom: 20px !important;
  }

  .home-content-col {
    padding: 10px 6px !important;
  }

  .home-tabs-wrapper {
    margin-left: -6px;
    margin-right: -6px;
    padding: 2px 6px 6px;
  }

  .home-tabs .q-tab {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 0.75rem;
    min-height: 36px;
  }

  .home-tabs .q-tab__label {
    font-size: 0.75rem;
  }

  .reviews-tab-content {
    padding-left: 0;
    padding-right: 0;
  }

  .reviews-row {
    width: 100%;
  }

  .review-card-col {
    width: 100%;
    max-width: 100%;
  }

  .review-card {
    width: 100%;
    max-width: 100%;
    padding: 12px !important;
  }

  .review-card .review-name {
    font-size: 0.9375rem;
  }

  .review-card .review-title {
    font-size: 0.8125rem;
  }

  .review-card .review-message {
    font-size: 0.8125rem;
    line-height: 1.45;
  }
}
</style>
