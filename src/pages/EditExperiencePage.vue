<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-form @submit="submitForm" @reset="resetForm">
        <q-card-section>
          <div class="text-h6">Update Experience</div>
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="experience.name" label="Company Name" required />

          <q-input filled v-model="experience.sub_caption" label="Sub Company Caption" required class="q-mt-md" />

          <!-- <q-input filled v-model="experience.url" label="Company URL" class="q-mt-md" /> -->
          <!-- <q-input filled v-model="experience.github_url" label="GitHub URL" class="q-mt-md" /> -->
          <q-input filled v-model="experience.caption" label="Caption" type="textarea" class="q-mt-md" required />

          <!-- Drag & Drop Area for Image -->
          <div
            class="file-drop-area full-width q-mb-md q-mt-md"
            @dragover.prevent
            @drop.prevent="handleDrop"
            @click="triggerFileInput"
          >
            <q-icon name="cloud_upload" size="64px" color="primary" />
            <p>Drag & Drop your image here or click to select</p>
            <input
              ref="imageFileInput"
              type="file"
              accept="image/*"
              @change="handleFiles"
              class="file-input"
            />
          </div>

          <!-- Preview Selected Image File -->
          <div v-if="imagePreview" class="file-preview">
            <div class="file-preview-item">
              <img
                :src="imagePreview"
                alt="Image preview"
                class="file-preview-image"
              />
              <q-icon
                name="cancel"
                class="remove-icon"
                @click="removeFile"
              />
              <p>{{ experience.imageFile ? experience.imageFile.name : '' }}</p>
            </div>
          </div>

          <!-- <q-input filled v-model="experience.tech" label="Task" hint="Separate technologies with commas" class="q-mt-md q-mb-md" /> -->

          <q-btn type="submit" label="Submit" :loading="loading" color="primary" />
          <q-btn type="reset" label="Reset" color="secondary" flat />
        </q-card-section>
      </q-form>


    </q-card>
  </q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { api } from 'src/boot/axios';
import { LocalStorage, useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

const route = useRoute();

const experience = ref({
  name: '',
  // iconFile: null,
  url: '',
  // github_url: '',
  caption: '',
  sub_caption: '',
  imageFile: null,
  // tech: ''
});

const iconPreview = ref(null);
const imagePreview = ref(null);
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const iconFileInput = ref(null);
const imageFileInput = ref(null);

const handleDropIcon = (event) => {
  const files = event.dataTransfer.files;
  if (files.length) {
    handleIconFile(files[0]);
  }
};

const handleIconFiles = (event) => {
  const files = event.target.files;
  if (files.length) {
    handleIconFile(files[0]);
  }
};

const handleIconFile = (file) => {
  experience.value.iconFile = file;
  iconPreview.value = URL.createObjectURL(file);
};

const triggerIconFileInput = () => {
  iconFileInput.value.click();
};

const removeIconFile = () => {
  experience.value.iconFile = null;
  iconPreview.value = null;
};

const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  if (files.length) {
    handleFile(files[0]);
  }
};

const handleFiles = (event) => {
  const files = event.target.files;
  if (files.length) {
    handleFile(files[0]);
  }
};

const handleFile = (file) => {
  experience.value.imageFile = file;
  imagePreview.value = URL.createObjectURL(file);
};

const triggerFileInput = () => {
  imageFileInput.value.click();
};

const removeFile = () => {
  experience.value.imageFile = null;
  imagePreview.value = null;
};

const $q = useQuasar();

const getExperience = async () =>{
  $q.loading.show();
  await api.get(`/api/experiences/${route.params.id}/edit`)
  .then(response =>{
    // console.log(response);
    setTimeout(() => {
      experience.value.name = response.data.name;
      experience.value.sub_caption = response.data.sub_caption;
      // experience.value.url = response.data.url;
      experience.value.caption = response.data.caption;
      $q.loading.hide();
    },300)

  }).catch(error =>{
    console.log(error)
  });
}
const submitForm = async () => {
  loading.value = true;
  $q.loading.show();
  const formData = new FormData();
  formData.append('name', experience.value.name);
  formData.append('url', experience.value.url);
  formData.append('caption', experience.value.caption);
  formData.append('sub_caption', experience.value.sub_caption);

  if (experience.value.imageFile) {
    formData.append('image', experience.value.imageFile);
  }
  // const newToken = LocalStorage.getItem('jwt');
  await api.post(`/api/experiences/${route.params.id}/update`, formData, {
    headers: {
      // Authorization: "Bearer " + newToken,
      "Content-Type": "multipart/form-data",
    },
  })
  .then(response => {
    console.log(response);
    if (response.data.status === 200) {
      setTimeout(() => {
        $q.notify({
          type: "positive",
          icon: "save",
          timeout: 3000,
          position: "top",
          message: response.data.message,
        });
        // resetForm();
        $q.loading.hide();
        loading.value = false;
      }, 500);
    } else {
      setTimeout(() => {
        $q.notify({
          type: "negative",
          icon: "error",
          timeout: 3000,
          position: "top",
          message: response.data.message,
        });
        $q.loading.hide();
        loading.value = false;
      }, 3000);
    }
  })
  .catch(error => {
    console.error(error);
    setTimeout(() =>{
      $q.notify({
        type: "negative",
        icon: "error",
        timeout: 3000,
        position: "top",
        message: "Error! Please report to your IT support.",
      });
      $q.loading.hide();
      loading.value = false;
    },3000)
  });
};

const resetForm = () => {
  experience.value = {
    name: '',
    iconFile: null,
    url: '',
    github_url: '',
    caption: '',
    sub_caption: '',
    imageFile: null,
    tech: ''
  };
  iconPreview.value = null;
  imagePreview.value = null;
};
onMounted(() =>{
  getExperience();
})
</script>

<style scoped>
.file-drop-area {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px dashed #ccc;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.file-drop-area:hover {
  background-color: #f5f5f5;
}

.file-input,
.icon-file-input {
  display: none;
}

.file-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.file-preview-item {
  position: relative;
  display: inline-block;
  margin-right: 10px;
}

.file-preview-image {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.remove-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  color: red;
}
</style>
