<template>
  <q-page class="q-pa-md">
    <q-card-section class="q-mb-md">
      <div class="row justify-between items-center">
        <div class="text-h6 text-center">Experiences</div>
        <q-btn
          label="Add Experience"
          color="primary"
          outline
          icon="add"
          to="/add-experience"

        />
      </div>
    </q-card-section>
    <!-- Experience Section -->
    <div class="q-pa-sm">

      <!-- Draggable Area -->
      <draggable
        v-model="experiences"
        @end="onDragEnd"
        class="dragArea row items-stretch justify-center"
        item-key="id"
        ghost-class="draggable-ghost"
        chosen-class="draggable-chosen"
      >
        <q-card
          v-for="post in experiences"
          :key="post.id"
          bordered
          rounded
          style="border-radius: 20px"
          class="col-12 col-sm-6 col-md-4 col-lg-3 q-pt-sm "
          :class="$q.screen.gt.sm ? 'q-mr-md q-mb-md' : 'q-mb-md'"
        >
          <!-- Card content -->
          <q-item class="full-width">
            <!-- <q-item-section avatar>
              <q-avatar>
                <img :src="post.icon" />
              </q-avatar>
            </q-item-section> -->
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
            <q-btn
              color="primary"
              label="edit"
              icon="mdi-square-edit-outline"
              class="q-mr-sm"
              :size="$q.screen.gt.sm ? 'sm' : 'sm'"
              :to="`/experience/${post.id}/edit`"
            />
            <q-btn
              color="negative"
              label="delete"
              icon="mdi-trash-can-outline"

              @click="deleteFunc(post.id)"
              :size="$q.screen.gt.sm ? 'sm' : 'sm'"
            />
          </q-card-section>
        </q-card>
      </draggable>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';

import { VueDraggableNext } from 'vue-draggable-next';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';

export default {
  components:{
    draggable: VueDraggableNext
  },
  setup(){
    const $q = useQuasar();
    const deleteFunc = async (id) =>{
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
        api.delete(`/api/experiences/${id}`)
        .then(response =>{
          if(response.data.status == 200){
            setTimeout(()=>{
              $q.notify({
                position: 'top',
                type: 'positive',
                timeout: 3000,
                message: response.data.message
              });
              getAllExperience();
              $q.loading.hide();
            }, 300)
          }else{
            setTimeout(()=>{
              $q.notify({
                position: 'top',
                type: 'negative',
                timeout: 3000,
                message: response.data.message
              });
              $q.loading.hide();
            }, 3000)
          }

        }).catch(error =>{
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
    const experiences = ref([
    // {
    //   id: 1,
    //   name: "Nehemiah Solutions Inc.",
    //   icon: "/images/nehemiah-icon.png",
    //   caption:
    //     "Nehemiah creates and develops dynamic websites, automation systems, and does consultation for businesses and leading global brands. A highly customizable System with quality services support that you can count on and addresses your Institution’s need.",
    //   sub_caption: "Fullstack Developer 2021-2024",
    //   imageUrl: "/images/nehemiah.png",
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
    //   icon: "/images/groom-and-brew-icon.png",
    //   name: "Groom & Brew Mfg",
    //   id: 2,
    //   caption:
    //     "In 2018, I stopped working as a programmer and started my own business called Groom & Brew MFG. My business focuses on creating men’s grooming like hair/beard growers, hair pomades, beard shampoo, beard oil, tattoo aftercare, perfumes and many other more. I’m also building an e-commerce website to sell my products aside from the well-known platforms like Facebook, shopee and Lazada.",
    //   sub_caption:
    //     "2018-2024 - Brewer/Formulator/Social Media Marketing/Web Developer ",
    //   imageUrl: "/images/groom-and-brew.png",
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
    //   icon: "/images/amazon-affiliate.png",
    //   name: "Almac Media LTD",
    //   id: 3,
    //   caption:
    //     "I worked for a year in Almac which is a SEO company. My job was to create Amazon-affiliated niche websites. These websites are especially created to earn money so it can be sold to empire flippers.",
    //   sub_caption: "2017-2018 - Wordpress Website Amazon Affilate Developer ",
    //   imageUrl: "/images/amazon.png",
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
    //   icon: "/images/empire-icon.png",
    //   name: "Empire Flippers",
    //   id: 4,
    //   caption:
    //     "This company is one of the biggest website flippers and I did profile investations and site vetting, checking on websites’ traffic, monthly income etc. I also did migration processes for successfully purchased websites.",
    //   sub_caption: "2015-2016 - MIGRATION SPECIALIST / SITE BROKER",
    //   imageUrl: "/images/empire.png",
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
    //   icon: "/images/SIC-icon.png",
    //   name: "Share Inspire Create",
    //   id: 5,
    //   caption:
    //     "ShareInspireCreate.com is a website of well-known Australian photographer and coach. I developed and managed his websites, keeping all his websites updated.",
    //   sub_caption: "2014-2018 - PART-TIME WEB MASTER ",
    //   imageUrl: "/images/SIC.png",
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
  ]);
  const onDragEnd = async (event) => {
    const reorderedExperiences = experiences.value.map((project, index) => ({
        id: project.id,
        order: index + 1,
        name: project.name,
        url: project.url,
        caption: project.caption,
        sub_caption: project.sub_caption,
        imageUrl: project.imageUrl,
      }));
      // The projects array is already updated by v-model,
      // so we just log the new order or update it in the backend.
      console.log("Updated experiences:", reorderedExperiences);
      // Here you can send the new order to your backend if needed
      // axios.post('/api/update-projects-order', projects);

      await api.post('/api/experiences/update-order', { experiences: experiences.value })
      .then(response =>{
        console.log(response)
        // console.log('Order updated successfully');

      }).then(error =>{
        console.log(error)
      });
  };

  const getAllExperience = async () =>{
      $q.loading.show();
      api.get('/api/experiences')
      .then(response =>{
        console.log(response);
        setTimeout(() =>{

          experiences.value = response.data;
          $q.loading.hide();
        }, 300)
      }).catch(error =>{
        console.log(error)
      });
    }
  return{
    getAllExperience,
    onDragEnd,
    experiences,
    deleteFunc
  }
  },
  mounted(){
    this.getAllExperience();
  }
}


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
</style>
