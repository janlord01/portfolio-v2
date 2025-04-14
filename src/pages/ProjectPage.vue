<template>
  <q-page class="q-pa-md">
    <q-card-section class="q-mb-md">
      <div class="row justify-between items-center">
        <div class="text-h6 text-center">Projects</div>
        <q-btn label="Add Project" color="primary" outline icon="add" to="/add-project" />
      </div>
    </q-card-section>

    <div class="q-pa-sm">
      <!-- Draggable Area -->
      <draggable v-model="projects" @end="onDragEnd" class="dragArea row items-stretch justify-center" item-key="id"
        ghost-class="draggable-ghost" chosen-class="draggable-chosen">
        <q-card v-for="element in projects" :key="element.id" bordered rounded style="border-radius: 20px"
          class="col-12 col-sm-6 col-md-4 col-lg-3 q-pt-sm " :class="$q.screen.gt.sm ? 'q-mr-md q-mb-md' : 'q-mb-md'">
          <!-- Card content -->
          <q-item class="full-width">
            <q-item-section avatar>
              <q-avatar>
                <img :src="element.icon" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">{{ element.name }}</q-item-label>
              <q-item-label caption>{{ element.sub_caption }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-img :src="element.imageUrl" />
          <q-card-section>
            <div>{{ element.caption }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-chip size="sm" v-for="(item, index) in element.tech" :key="index">
              {{ item }}
            </q-chip>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-btn color="black" dense flat icon="mdi-github" :size="$q.screen.gt.sm ? 'md' : 'sm'" target="_blank"
              no-caps :href="element.github_url" v-if="element.github_url" />
            <q-btn color="primary" dense flat icon="mdi-web" outline :size="$q.screen.gt.sm ? 'md' : 'sm'"
              target="_blank" :href="element.url" v-if="element.url" />
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-btn color="primary" label="edit" icon="mdi-square-edit-outline" class="q-mr-sm"
              :size="$q.screen.gt.sm ? 'sm' : 'sm'" :to="`/project/${element.id}/edit`" />
            <q-btn color="negative" label="delete" icon="mdi-trash-can-outline" @click="deleteFunc(element.id)"
              :size="$q.screen.gt.sm ? 'sm' : 'sm'" />
          </q-card-section>
        </q-card>
      </draggable>
    </div>
  </q-page>
</template>
<script>
import { colors, useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { reactive, ref } from "vue";
import { VueDraggableNext } from "vue-draggable-next";

export default {
  components: {
    draggable: VueDraggableNext,
  },
  setup() {
    const deleteFunc = async (id) => {
      $q.dialog({
        title: 'Delete',
        message: 'Are you sure you want to delete this?',
        ok: {
          push: true,
          color: 'primary',
          label: 'Yes, delete'
        },
        cancel: {
          push: true,
          color: 'grey'
        },
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
        $q.loading.show();
        api.delete(`/api/projects/${id}`)
          .then(response => {
            if (response.data.status == 200) {
              setTimeout(() => {
                $q.notify({
                  position: 'top',
                  type: 'positive',
                  timeout: 3000,
                  message: response.data.message
                });
                getAllProject();
                $q.loading.hide();
              }, 300)
            } else {
              setTimeout(() => {
                $q.notify({
                  position: 'top',
                  type: 'negative',
                  timeout: 3000,
                  message: response.data.message
                });
                $q.loading.hide();
              }, 3000)
            }

          }).catch(error => {
            console.error(error);
            $q.notify({
              position: 'top',
              type: 'negative',
              timeout: 3000,
              message: 'Something went wrong, Please contact your IT support!'
            });
            $q.loading.hide();
          })

      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
    const projects = ref([
      // {
      //   icon: "/images/woo-tier-custom.png",
      //   name: "service-listing-woo-extension",
      //   url: "https://theindiebeautycollective.kickassweb.dev/",
      //   github_url:
      //     "https://github.com/janlord01/list-subscription-woo-extension",
      //   id: 1,
      //   caption:
      //     "This plugin seamlessly integrates with WooCommerce, allowing you to offer tiered services that add significant value to your customers while creating new revenue streams for your business.",
      //   date: 1713794484736,
      //   sub_caption: "Service listing woo extension with subscription tier",
      //   imageUrl: "/images/woo-tier-custom.png",
      //   tech: [
      //     "Wordpress",
      //     "Plugin",
      //     "PHP",
      //     "Javascript",
      //     "JQuery",
      //     "HTML",
      //     "CSS",
      //   ],
      // },

      // {
      //   icon: "/images/wp-jl-underconstruction-desktop.png",
      //   name: "jl-under-construction plugin",
      //   url: "",
      //   github_url:
      //     "https://github.com/janlord01/wp-jl-under-construction-plugin",
      //   id: 2,
      //   caption:
      //     "A simple WordPress plugin to display an under-construction page on your website. It includes customizable settings for background images, text, and social media links, along with optional background overlays and dynamic styling for headings and paragraphs.",
      //   date: 1713794484736,
      //   sub_caption: "JL Under Construction Page is a WordPress plugin",
      //   imageUrl: "/images/wp-jl-underconstruction-desktop.png",
      //   tech: ["Wordpress", "Plugin", "PHP", "Javascript", "HTML", "CSS"],
      // },
      // {
      //   icon: "/images/2913133.png",
      //   name: "wp-login-logout-menu plugin",
      //   url: "",
      //   github_url: "https://github.com/janlord01/wp-login-logout-menu",
      //   id: 3,
      //   caption:
      //     "WP Login Logout Menu is a WordPress plugin that adds a login/logout menu item to your navigation menu. The menu item dynamically changes based on the user's login status. When the user is logged in, it shows a Logout link; when the user is logged out, it shows a Login link.",
      //   date: 1713794484736,
      //   sub_caption: "WP Login Logout Menu is a WordPress plugin",
      //   imageUrl: "/images/wp-login-logout-desktop.png",
      //   tech: ["Wordpress", "Plugin", "PHP", "Javascript", "HTML", "CSS"],
      // },
      // {
      //   icon: "/images/janlord.png",
      //   name: "janlordluga.com",
      //   url: "https://janlordluga.com/",
      //   github_url: "https://github.com/janlord01/portfolio-v2",
      //   id: 4,
      //   caption:
      //     "My portfolio site, version 2, is a dynamic and responsive web application built with Quasar Framework and Vue.js. It showcases my expertise in modern web development, featuring sleek design elements and optimized performance across all devices.",
      //   date: 1713794484736,
      //   sub_caption: "Portfolio Website v2 - Using Quasar/Vue Js",
      //   imageUrl: "/images/janlord-v2-desktop.png",
      //   tech: ["Quasar", "Vues", "Javascript", "HTML", "CSS"],
      // },
      // // {
      // //   icon: "/images/janlord-icon-v1.png",
      // //   name: "v1.janlordluga.com",
      // //   url: "https://portfolio-v1-five-jet.vercel.app/",
      // //   id: 1,
      // //   caption:
      // //     "My portfolio site, version 1, was crafted using Next.js and styled with Tailwind CSS. This version highlights my skills in building fast, scalable web applications with a focus on clean, modern design and efficient development practices.",
      // //   date: 1713794484736,
      // //   sub_caption: "Portfolio Website v1 - Using NextJs 13",
      // //   imageUrl: "/images/janlord-v1-desktop.png",
      // //   tech: ["Nextjs", "ReactJs", "Javascript", "HTML", "CSS", "Tailwind"],
      // // },
      // {
      //   icon: "/images/ink&shears-icon.png",
      //   name: "app.inkshears.com",
      //   url: "https://app.inkshears.com",
      //   github_url: "https://github.com/janlord01/inkshears",
      //   id: 5,
      //   caption:
      //     "I’ve created a system for barbershop and tattoo shops where they can book an appointment online, track their inventory, manage their schedules and also have summary reports on their cash inflows and outflows.",
      //   date: 1713794484736,
      //   sub_caption: "Barbershop & Tattooshop Business Management System",
      //   imageUrl: "/images/inkshears2.png",
      //   tech: [
      //     "Quasar",
      //     "VueJs",
      //     "Pinia",
      //     "Laravel",
      //     "PHP",
      //     "Javascript",
      //     "HTML",
      //     "CSS",
      //   ],
      // },
      // {
      //   icon: "/images/beefit-icon.png",
      //   name: "pos.beefitgym.com",
      //   url: "https://pos.beefitgym.com",
      //   github_url: "https://github.com/janlord01/gym-membership-frontend",
      //   id: 6,
      //   caption:
      //     "In an effort to create a system that would be beneficial and profitable in our local community, I created a fitness gym app designed to help gym owners manage their business well and for their users to be able to maximize their membership benefits. This is an app that is ready for franchise business.",
      //   date: 1713794484736,
      //   sub_caption: "Fitness Membership System",
      //   imageUrl: "/images/beefit2.png",
      //   tech: [
      //     "Quasar",
      //     "VueJs",
      //     "Pinia",
      //     "Laravel",
      //     "PHP",
      //     "Javascript",
      //     "HTML",
      //     "CSS",
      //   ],
      // },
      // {
      //   icon: "/images/sims-icon.png",
      //   name: "system.cotabatocityinstituteinc.com",
      //   url: "https://system.cotabatocityinstituteinc.com/",
      //   github_url: "https://github.com/janlord01/sims-frontend",
      //   id: 7,
      //   caption:
      //     "This is a system I have created for primary, secondary and tertiary schools for them to be able to manage their business well. The system can be used by administrators, teachers, faculty and staff, students and their parents.",
      //   date: 1713794484736,
      //   sub_caption: "School Information Management System (Version 2)",
      //   imageUrl: "/images/desktop-sims.png",
      //   tech: [
      //     "Quasar",
      //     "VueJs",
      //     "Vuex",
      //     "Laravel",
      //     "PHP",
      //     "Javascript",
      //     "HTML",
      //     "CSS",
      //   ],
      // },
      // {
      //   icon: "/images/sims-icon.png",
      //   name: "sims.newilangachieversacademy.com",
      //   url: "https://sims.newilangachieversacademy.com",
      //   id: 8,
      //   caption:
      //     "I used full-stack Laravel in creating this system which is solely for Basic Education Schools. After a few months I made the Version 2 of this using back-end Laravel. The latter is suitable for primary up to tertiary education.",
      //   date: 1713794484736,
      //   sub_caption: "School Information Management System (Version 1)",
      //   imageUrl: "/images/sims-icon-2.png",
      //   tech: ["Laravel", "PHP", "Javascript", "HTML", "CSS"],
      // },
      // {
      //   icon: "/images/clyk-icon.png",
      //   name: "clykportraitstudio.com",
      //   url: "https://clykportraitstudio.com",
      //   id: 9,
      //   caption:
      //     "A local client of mine who is in the make-up and photography industry requested this website/system for her business. It is still on progress, but the function of this website is to help customers book an appointment and help my client manage her business.",
      //   date: 1713794484736,
      //   sub_caption: "Portrait and Make Up Booking Site",
      //   imageUrl: "/images/clyk.png",
      //   tech: ["Wordpress", "PHP", "Javascript", "HTML", "CSS"],
      // },
      // {
      //   icon: "/images/SIC-icon.png",
      //   name: "shareinspirecreate.com",
      //   url: "https://shareinspirecreate.com",
      //   id: 10,
      //   caption:
      //     "This is for a photographer client I had back then that offers online courses and photography and writes contents on his platform.",
      //   date: 1713794484736,
      //   sub_caption: "Photographer Blog and E-course Site",
      //   imageUrl: "/images/SIC.png",
      //   tech: ["Wordpress", "PHP", "Javascript", "HTML", "CSS"],
      // },
      // {
      //   icon: "/images/legend-icon.png",
      //   name: "legendsacademy.com.au",
      //   url: "https://legendsacademy.com.au",
      //   id: 11,
      //   caption:
      //     "A website I created for a client who writes blogs for dating and coaches other people on romantic relationships.",
      //   date: 1713794484736,
      //   sub_caption: "Dating Coaching Website",
      //   imageUrl: "/images/legend.png",
      //   tech: ["Wordpress", "PHP", "Javascript", "HTML", "CSS"],
      // },
    ]);

    const onDragEnd = async (event) => {
      const reorderedProjects = projects.value.map((project, index) => ({
        id: project.id,
        order: index + 1,
        icon: project.icon,
        name: project.name,
        url: project.url,
        caption: project.caption,
        date: project.date,
        sub_caption: project.sub_caption,
        imageUrl: project.imageUrl,
        tech: project.tech,
        github_url: project.github_url
      }));
      // The projects array is already updated by v-model,
      // so we just log the new order or update it in the backend.
      console.log("Updated projects:", reorderedProjects);
      // Here you can send the new order to your backend if needed
      // axios.post('/api/update-projects-order', projects);

      await api.post('/api/projects/update-order', { projects: projects.value })
        .then(response => {
          console.log(response)
          // console.log('Order updated successfully');

        }).then(error => {
          console.log(error)
        });

    };
    const log = (event) => {
      console.log(event);
    };
    const $q = useQuasar();
    const getAllProject = async () => {
      $q.loading.show();
      api.get('/api/projects')
        .then(response => {
          console.log(response);
          setTimeout(() => {

            projects.value = response.data.projects;
            $q.loading.hide();
          }, 300)
        }).catch(error => {
          console.log(error)
        });
    }

    return {
      projects,
      log,
      onDragEnd,
      $q,
      getAllProject,
      deleteFunc
    };
  },
  data() {
    return {
      enabled: true,
      dragging: false,
    };
  },
  mounted() {
    this.getAllProject();
  }
};
</script>

<style scoped>
.q-gutter-md {
  gap: 1rem;
}

.rounded-borders {
  border-radius: 8px;
  object-fit: cover;
}

.q-pa-md {
  padding: 16px;
}

.q-mr-sm {
  margin-right: 8px;
}

.q-mb-sm {
  margin-bottom: 8px;
}

/* Optional: Styles to indicate dragging */
.draggable-ghost {
  opacity: 0.4;
}

.draggable-chosen {
  background-color: #e0e0e0;
}
</style>
