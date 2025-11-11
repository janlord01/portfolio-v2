<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-form @submit="submitForm" @reset="resetForm">
        <q-card-section>
          <div class="text-h6">Update {{ settingStore.settingsData.tech_title || 'Tech Stack' }}</div>
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="tech.name" label="Name" required />

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
              <p>{{ tech.imageFile ? tech.imageFile.name : '' }}</p>
            </div>
          </div>

          <!-- Show existing image if no new file selected -->
          <div v-if="!imagePreview && tech.image_url" class="file-preview">
            <div class="file-preview-item">
              <img
                :src="tech.image_url"
                alt="Current image"
                class="file-preview-image"
              />
              <p class="text-caption q-mt-xs">Current image</p>
            </div>
          </div>

          <q-btn type="submit" label="Update" :loading="loading" color="primary" />
          <q-btn type="reset" label="Reset" color="secondary" flat />
        </q-card-section>
      </q-form>


    </q-card>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { api } from 'src/boot/axios';
import { LocalStorage, useQuasar } from 'quasar';
import { useSettingsStore } from 'src/stores/settings/settingStore';
import { useRoute } from 'vue-router';

const settingStore = useSettingsStore();
const route = useRoute();

const tech = ref({
  name: '',
  imageFile: null,
  image_url: null,
});

const imagePreview = ref(null);
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const imageFileInput = ref(null);

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
  tech.value.imageFile = file;
  imagePreview.value = URL.createObjectURL(file);
};

const triggerFileInput = () => {
  imageFileInput.value.click();
};

const removeFile = () => {
  tech.value.imageFile = null;
  imagePreview.value = null;
};

const $q = useQuasar();

const getTech = async () => {
  $q.loading.show();
  await api.get(`/api/tech/${route.params.id}/edit`)
    .then(response => {
      setTimeout(() => {
        tech.value.name = response.data.name;
        tech.value.image_url = response.data.image_url;
        $q.loading.hide();
      }, 300);
    })
    .catch(error => {
      console.error(error);
      $q.loading.hide();
      $q.notify({
        type: "negative",
        icon: "error",
        timeout: 3000,
        position: "top",
        message: "Error loading tech stack data. Please try again.",
      });
    });
};

const submitForm = async () => {
  loading.value = true;
  $q.loading.show();
  const formData = new FormData();
  formData.append('name', tech.value.name);

  if (tech.value.imageFile) {
    formData.append('image', tech.value.imageFile);
  }

  await api.post(`/api/tech/${route.params.id}/update`, formData, {
    headers: {
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
        resetForm();
        $q.loading.hide();
        loading.value = false;
        // Reload the tech data
        getTech();
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
  tech.value = {
    name: '',
    imageFile: null,
    image_url: tech.value.image_url, // Keep existing image_url
  };
  imagePreview.value = null;
};

onMounted(() => {
  getTech();
});
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

