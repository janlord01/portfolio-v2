<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-4 large-screen-only">
        <q-item
          :class="$q.screen.gt.sm ? 'fixed' : 'relative'"
          :style="$q.screen.gt.sm ? 'width: 300px;' : 'max-width: 330px;'"
        >
          <q-item-section avatar :class="$q.screen.gt.sm ? 'full-width' : ''">
            <q-avatar :size="$q.screen.gt.sm ? '200px' : '120px'">
              <img src="/images/janlord.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div
              :class="$q.screen.gt.sm ? 'full-width' : ''"
              :style="
                $q.screen.gt.sm
                  ? 'position: absolute; top: 240px; left: 10px'
                  : 'position: relative;top: 0px; left: 10px; '
              "
            >
              <p
                class="text-bold text-name text-grey-9"
                :style="$q.screen.gt.sm ? 'font-size: 40px' : 'font-size: 20px'"
              >
                Janlord Luga
              </p>
              <span
                :style="
                  $q.screen.gt.sm
                    ? 'margin-top: -25px; display: block'
                    : 'margin-top: -15px;display: block'
                "
                ><q-icon name="location_on" />Davao City, Philippines</span
              >
              <q-btn
                color="orange-9"
                label="hire me"
                size="md"
                href="mailto:janlord.luga@gmail.com"
                unelevated
                :style="
                  $q.screen.gt.sm
                    ? 'display:inline-block;margin-top: 10px;'
                    : 'display:inline-block;margin-top: 5px;'
                "
              />
              <p
                class="text-bold text-name text-grey-9"
                style="font-size: 25px; margin-top: 20px"
                :style="$q.screen.gt.sm ? 'display:block;' : 'display:none'"
              >
                Software Engineer
              </p>
              <p
                :style="$q.screen.gt.sm ? 'display:block;' : 'display:none'"
                class="text-grey-9"
                style="font-size: 14px; margin-top: -20px"
              >
                I build fun and efficient systems.
              </p>
              <div :style="$q.screen.gt.sm ? 'display:block;' : 'display:none'">
                <p
                  class="text-bold text-name text-grey-9"
                  style="font-size: 25px; margin-top: 20px"
                >
                  Tech Stack
                </p>
                <q-avatar size="50px" class="q-mr-sm">
                  <img width="50" src="/images/quasar.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm">
                  <img width="50px" src="/images/vue-js.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm">
                  <img width="50px" src="/images/laravel.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm">
                  <img width="50px" src="/images/mysql.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm">
                  <img width="50px" src="/images/php.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm q-mt-sm">
                  <img width="50px" src="/images/js.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm q-mt-sm">
                  <img width="50px" src="/images/html.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm q-mt-sm">
                  <img width="50px" src="/images/css.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm q-mt-sm">
                  <img width="50px" src="/images/jquery.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm q-mt-sm">
                  <img width="50px" src="/images/codeigniter.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm q-mt-sm">
                  <img width="50px" src="/images/wordpress.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm q-mt-sm">
                  <img width="50px" src="/images/moodle.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm q-mt-sm">
                  <img width="50px" src="/images/shopify.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm q-mt-sm">
                  <img width="50px" src="/images/bootstrap.png" />
                </q-avatar>
                <q-avatar size="50px" class="q-mr-sm q-mt-sm">
                  <img width="50px" src="/images/tailwind.png" />
                </q-avatar>
              </div>
            </div>
          </q-item-section>
        </q-item>
        <div
          class="q-pa-sm"
          :style="
            $q.screen.gt.sm
              ? 'display:none;'
              : 'display:block; max-width:320px; border: solid  1px #E5E5E5;margin:auto'
          "
        >
          <p
            class="text-bold text-name text-grey-9 text-center"
            style="font-size: 25px; margin-top: 20px"
          >
            Full-Stack Developer
          </p>
          <p
            class="text-grey-9 text-center"
            style="font-size: 14px; margin-top: -20px"
          >
            I build fun and efficient systems.
          </p>

          <p
            class="text-bold text-name text-grey-9 text-center"
            style="font-size: 25px; margin-top: 20px"
          >
            Tech Stack
          </p>
          <q-avatar size="50px" class="q-mr-sm">
            <img width="50" src="/images/quasar.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm">
            <img width="50px" src="/images/vue-js.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm">
            <img width="50px" src="/images/laravel.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm">
            <img width="50px" src="/images/mysql.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm">
            <img width="50px" src="/images/php.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm q-mt-sm">
            <img width="50px" src="/images/js.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm q-mt-sm">
            <img width="50px" src="/images/html.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm q-mt-sm">
            <img width="50px" src="/images/css.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm q-mt-sm">
            <img width="50px" src="/images/jquery.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm q-mt-sm">
            <img width="50px" src="/images/codeigniter.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm q-mt-sm">
            <img width="50px" src="/images/wordpress.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm q-mt-sm">
            <img width="50px" src="/images/moodle.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm q-mt-sm">
            <img width="50px" src="/images/shopify.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm q-mt-sm">
            <img width="50px" src="/images/bootstrap.png" />
          </q-avatar>
          <q-avatar size="50px" class="q-mr-sm q-mt-sm">
            <img width="50px" src="/images/tailwind.png" />
          </q-avatar>
        </div>
      </div>
      <div class="col col-sm-8">
        <!-- Projects Section -->
        <div class="q-pa-sm">
          <p class="text-h6 text-center">Project</p>
          <div
            :class="$q.screen.gt.md ? 'row items-start ' : 'column items-start'"
            class="q-mt-md"
          >
            <q-card
              v-for="post in posts"
              :key="post.id"
              bordered
              rounded
              style="border-radius: 20px"
              class="q-my-sm q-mr-md"
              :style="$q.screen.gt.md ? 'flex-basis: 48%; ' : 'width: 100%'"
            >
              <!-- Card content -->
              <q-item class="full-width">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="post.icon" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold">{{ post.name }}</q-item-label>
                  <q-item-label caption> {{ post.sub_caption }} </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-img :src="post.imageUrl" />
              <q-card-section>
                <div>{{ post.caption }}</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-chip
                  size="sm"
                  v-for="(item, index) in post.tech"
                  :key="index"
                  >{{ item }}</q-chip
                >
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-btn
                  color="orange-9"
                  label="Live"
                  outline
                  :size="$q.screen.gt.sm ? 'md' : 'sm'"
                  target="_blank"
                  :href="post.url"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
        <q-separator class="q-mt-lg" />

        <!-- Experience Section -->
        <div class="q-pa-sm">
          <p class="text-h6 text-center q-mt-md">Experience</p>
          <div
            :class="$q.screen.gt.md ? 'row items-start ' : 'column items-start'"
            class="q-mt-md"
          >
            <q-card
              v-for="post in experiences"
              :key="post.id"
              bordered
              rounded
              style="border-radius: 20px"
              class="q-my-sm q-mr-md"
              :style="$q.screen.gt.md ? 'flex-basis: 48%' : 'width: 100%'"
            >
              <!-- Card content -->
              <q-item class="full-width">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="post.icon" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold">{{ post.name }}</q-item-label>
                  <q-item-label caption> {{ post.sub_caption }} </q-item-label>
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
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { date } from "quasar";
import { reactive, computed, onMounted } from "vue";
import axios from "src/boot/axios";
import { useQuasar } from "quasar";

const $q = useQuasar();

defineOptions({
  name: "PageHome",
});

const posts = reactive([
  {
    icon: "/images/2913133.png",
    name: "wp-login-logout-menu plugin",
    url: "https://github.com/janlord01/wp-login-logout-menu",
    id: 1,
    caption:
      "WP Login Logout Menu is a WordPress plugin that adds a login/logout menu item to your navigation menu. The menu item dynamically changes based on the user's login status. When the user is logged in, it shows a Logout link; when the user is logged out, it shows a Login link.",
    date: 1713794484736,
    sub_caption: "WP Login Logout Menu is a WordPress plugin",
    imageUrl: "/images/wp-login-logout-desktop.png",
    tech: ["Wordpress", "Plugin", "PHP", "Javascript", "HTML", "CSS"],
  },
  {
    icon: "/images/janlord.png",
    name: "janlordluga.com",
    url: "https://janlordluga.com/",
    id: 1,
    caption:
      "My portfolio site, version 2, is a dynamic and responsive web application built with Quasar Framework and Vue.js. It showcases my expertise in modern web development, featuring sleek design elements and optimized performance across all devices.",
    date: 1713794484736,
    sub_caption: "Portfolio Website v2 - Using Quasar/Vue Js",
    imageUrl: "/images/janlord-v2-desktop.png",
    tech: ["Quasar", "Vues", "Javascript", "HTML", "CSS"],
  },
  {
    icon: "/images/janlord-icon-v1.png",
    name: "v1.janlordluga.com",
    url: "https://portfolio-v1-five-jet.vercel.app/",
    id: 1,
    caption:
      "My portfolio site, version 1, was crafted using Next.js and styled with Tailwind CSS. This version highlights my skills in building fast, scalable web applications with a focus on clean, modern design and efficient development practices.",
    date: 1713794484736,
    sub_caption: "Portfolio Website v1 - Using NextJs 13",
    imageUrl: "/images/janlord-v1-desktop.png",
    tech: ["Nextjs", "ReactJs", "Javascript", "HTML", "CSS", "Tailwind"],
  },
  {
    icon: "/images/ink&shears-icon.png",
    name: "app.inkshears.com",
    url: "https://app.inkshears.com",
    id: 1,
    caption:
      "I’ve created a system for barbershop and tattoo shops where they can book an appointment online, track their inventory, manage their schedules and also have summary reports on their cash inflows and outflows.",
    date: 1713794484736,
    sub_caption: "Barbershop & Tattooshop Business Management System",
    imageUrl: "/images/inkshears2.png",
    tech: [
      "Quasar",
      "VueJs",
      "Pinia",
      "Laravel",
      "PHP",
      "Javascript",
      "HTML",
      "CSS",
    ],
  },
  {
    icon: "/images/beefit-icon.png",
    name: "pos.beefitgym.com",
    url: "https://pos.beefitgym.com",
    id: 2,
    caption:
      "In an effort to create a system that would be beneficial and profitable in our local community, I created a fitness gym app designed to help gym owners manage their business well and for their users to be able to maximize their membership benefits. This is an app that is ready for franchise business.",
    date: 1713794484736,
    sub_caption: "Fitness Membership System",
    imageUrl: "/images/beefit2.png",
    tech: [
      "Quasar",
      "VueJs",
      "Pinia",
      "Laravel",
      "PHP",
      "Javascript",
      "HTML",
      "CSS",
    ],
  },
  {
    icon: "/images/sims-icon.png",
    name: "system.nema-edu.com",
    url: "https://system.nema-edu.com",
    id: 3,
    caption:
      "This is a system I have created for primary, secondary and tertiary schools for them to be able to manage their business well. The system can be used by administrators, teachers, faculty and staff, students and their parents.",
    date: 1713794484736,
    sub_caption: "School Information Management System (Version 2)",
    imageUrl: "/images/desktop-sims.png",
    tech: [
      "Quasar",
      "VueJs",
      "Vuex",
      "Laravel",
      "PHP",
      "Javascript",
      "HTML",
      "CSS",
    ],
  },
  {
    icon: "/images/sims-icon.png",
    name: "sims.newilangachieversacademy.com",
    url: "https://sims.newilangachieversacademy.com",
    id: 4,
    caption:
      "I used full-stack Laravel in creating this system which is solely for Basic Education Schools. After a few months I made the Version 2 of this using back-end Laravel. The latter is suitable for primary up to tertiary education.",
    date: 1713794484736,
    sub_caption: "School Information Management System (Version 1)",
    imageUrl: "/images/sims-icon-2.png",
    tech: ["Laravel", "PHP", "Javascript", "HTML", "CSS"],
  },
  {
    icon: "/images/clyk-icon.png",
    name: "clykportraitstudio.com",
    url: "https://clykportraitstudio.com",
    id: 5,
    caption:
      "A local client of mine who is in the make-up and photography industry requested this website/system for her business. It is still on progress, but the function of this website is to help customers book an appointment and help my client manage her business.",
    date: 1713794484736,
    sub_caption: "Portrait and Make Up Booking Site",
    imageUrl: "/images/clyk.png",
    tech: ["Wordpress", "PHP", "Javascript", "HTML", "CSS"],
  },
  {
    icon: "/images/SIC-icon.png",
    name: "shareinspirecreate.com",
    url: "https://shareinspirecreate.com",
    id: 6,
    caption:
      "This is for a photographer client I had back then that offers online courses and photography and writes contents on his platform.",
    date: 1713794484736,
    sub_caption: "Photographer Blog and E-course Site",
    imageUrl: "/images/SIC.png",
    tech: ["Wordpress", "PHP", "Javascript", "HTML", "CSS"],
  },
  {
    icon: "/images/legend-icon.png",
    name: "legendsacademy.com.au",
    url: "https://legendsacademy.com.au",
    id: 5,
    caption:
      "A website I created for a client who writes blogs for dating and coaches other people on romantic relationships.",
    date: 1713794484736,
    sub_caption: "Dating Coaching Website",
    imageUrl: "/images/legend.png",
    tech: ["Wordpress", "PHP", "Javascript", "HTML", "CSS"],
  },
]);

const experiences = reactive([
  {
    id: 1,
    name: "Nehemiah Solutions Inc.",
    icon: "/images/nehemiah-icon.png",
    caption:
      "Nehemiah creates and develops dynamic websites, automation systems, and does consultation for businesses and leading global brands. A highly customizable System with quality services support that you can count on and addresses your Institution’s need.",
    sub_caption: "Fullstack Developer 2021-2024",
    imageUrl: "/images/nehemiah.png",
    tech: [
      "Quasar",
      "VueJs",
      "Pinia",
      "Laravel",
      "PHP",
      "Javascript",
      "HTML",
      "CSS",
    ],
  },
  {
    icon: "/images/groom-and-brew-icon.png",
    name: "Groom & Brew Mfg",
    id: 2,
    caption:
      "In 2018, I stopped working as a programmer and started my own business called Groom & Brew MFG. My business focuses on creating men’s grooming like hair/beard growers, hair pomades, beard shampoo, beard oil, tattoo aftercare, perfumes and many other more. I’m also building an e-commerce website to sell my products aside from the well-known platforms like Facebook, shopee and Lazada.",
    sub_caption:
      "2018-2024 - Brewer/Formulator/Social Media Marketing/Web Developer ",
    imageUrl: "/images/groom-and-brew.png",
    tech: [
      "Quasar",
      "VueJs",
      "Pinia",
      "Laravel",
      "PHP",
      "Javascript",
      "HTML",
      "CSS",
    ],
  },
  {
    icon: "/images/amazon-affiliate.png",
    name: "Almac Media LTD",
    id: 2,
    caption:
      "I worked for a year in Almac which is a SEO company. My job was to create Amazon-affiliated niche websites. These websites are especially created to earn money so it can be sold to empire flippers.",
    sub_caption: "2017-2018 - Wordpress Website Amazon Affilate Developer ",
    imageUrl: "/images/amazon.png",
    tech: [
      "Quasar",
      "VueJs",
      "Pinia",
      "Laravel",
      "PHP",
      "Javascript",
      "HTML",
      "CSS",
    ],
  },
  {
    icon: "/images/empire-icon.png",
    name: "Empire Flippers",
    id: 2,
    caption:
      "This company is one of the biggest website flippers and I did profile investations and site vetting, checking on websites’ traffic, monthly income etc. I also did migration processes for successfully purchased websites.",
    sub_caption: "2015-2016 - MIGRATION SPECIALIST / SITE BROKER",
    imageUrl: "/images/empire.png",
    tech: [
      "Quasar",
      "VueJs",
      "Pinia",
      "Laravel",
      "PHP",
      "Javascript",
      "HTML",
      "CSS",
    ],
  },
  {
    icon: "/images/SIC-icon.png",
    name: "Share Inspire Create",
    id: 2,
    caption:
      "ShareInspireCreate.com is a website of well-known Australian photographer and coach. I developed and managed his websites, keeping all his websites updated.",
    sub_caption: "2014-2018 - PART-TIME WEB MASTER ",
    imageUrl: "/images/SIC.png",
    tech: [
      "Quasar",
      "VueJs",
      "Pinia",
      "Laravel",
      "PHP",
      "Javascript",
      "HTML",
      "CSS",
    ],
  },
]);

const getPosts = () => {
  // this.$axios
  //   .get("https://posts-mqy6ujqfma-uc.a.run.app/")
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

const niceDate = (value) => {
  return date.formatDate(value, "MMMM D h:mmA");
};
onMounted(() => {
  getPosts();
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
  flex: 0 1 calc(33.33% - 20px); /* Adjust width and margin as needed */
  margin-bottom: 20px; /* Adjust margin as needed */
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box; /* Ensure padding is included in width calculation */
}
</style>
