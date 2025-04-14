<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-form @submit="submitForm" @reset="resetForm" enctype="multipart/form-data">
        <q-card-section>
          <div class="text-h6">Update Project</div>
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="project.name" label="Project Title" required />
          <q-input filled v-model="project.sub_caption" label="Sub Title" required class="q-mt-md" />
          <!-- Drag & Drop Area for Icon -->
          <div class="file-drop-area full-width q-mb-md q-mt-md" @dragover.prevent @drop.prevent="handleDropIcon"
            @click="triggerIconFileInput">
            <q-icon name="cloud_upload" size="64px" color="primary" />
            <p>Drag & Drop your icon here or click to select</p>
            <input ref="iconFileInput" type="file" accept="image/*" @change="handleIconFiles" class="file-input" />
          </div>

          <!-- Preview Selected Icon File -->
          <div v-if="iconPreview" class="file-preview">
            <div class="file-preview-item">
              <img :src="iconPreview" alt="Icon preview" class="file-preview-image" />
              <q-icon name="cancel" class="remove-icon" @click="removeIconFile" />
              <p>{{ project.iconFile ? project.iconFile.name : '' }}</p>
            </div>
          </div>

          <q-input filled v-model="project.url" label="Project URL" class="q-mt-md" />
          <q-input filled v-model="project.github_url" label="GitHub URL" class="q-mt-md" />
          <q-input filled v-model="project.caption" label="Caption" type="textarea" class="q-mt-md" required />


          <!-- Drag & Drop Area for Image -->
          <div class="file-drop-area full-width q-mb-md q-mt-md" @dragover.prevent @drop.prevent="handleDrop"
            @click="triggerFileInput">
            <q-icon name="cloud_upload" size="64px" color="primary" />
            <p>Drag & Drop your image here or click to select</p>
            <input ref="imageFileInput" type="file" accept="image/*" @change="handleFiles" class="file-input" />
          </div>

          <!-- Preview Selected Image File -->
          <div v-if="imagePreview" class="file-preview">
            <div class="file-preview-item">
              <img :src="imagePreview" alt="Image preview" class="file-preview-image" />
              <q-icon name="cancel" class="remove-icon" @click="removeFile" />
              <p>{{ project.imageFile ? project.imageFile.name : '' }}</p>
            </div>
          </div>

          <q-input filled v-model="project.tech" label="Tech Stack" hint="Separate technologies with commas"
            class="q-mt-md q-mb-md" />
          <q-input filled v-model="project.type" label="Type" hint="Separate with commas" class="q-mt-md q-mb-md" />

          <q-btn type="submit" label="Submit" color="primary" />
          <q-btn type="reset" label="Reset" color="secondary" flat />
        </q-card-section>
      </q-form>

      <q-card-section v-if="loading" class="q-mt-md">
        <q-spinner color="primary" />
        <span class="q-ml-sm">Submitting...</span>
      </q-card-section>

      <!-- <q-card-section v-if="successMessage" class="q-mt-md text-positive">
        {{ successMessage }}
      </q-card-section>

      <q-card-section v-if="errorMessage" class="q-mt-md text-negative">
        {{ errorMessage }}
      </q-card-section> -->
    </q-card>
  </q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { api } from 'src/boot/axios';
import { LocalStorage, useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
const project = ref({
  name: '',
  iconFile: null,
  url: '',
  github_url: '',
  caption: '',
  sub_caption: '',
  imageFile: null,
  tech: [],
  type: []
});

const route = useRoute();

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
  console.log('Icon Files:', files); // Add this
  if (files.length) {
    handleIconFile(files[0]);
  }
};

const handleIconFile = (file) => {
  project.value.iconFile = file;
  iconPreview.value = URL.createObjectURL(file);
};

const triggerIconFileInput = () => {
  iconFileInput.value.click();
};

const removeIconFile = () => {
  project.value.iconFile = null;
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
  console.log('Image Files:', files); // Add this log
  if (files.length) {
    handleFile(files[0]);
  }
};

const handleFile = (file) => {
  project.value.imageFile = file;
  imagePreview.value = URL.createObjectURL(file);
};

const triggerFileInput = () => {
  imageFileInput.value.click();
};

const removeFile = () => {
  project.value.imageFile = null;
  imagePreview.value = null;
};
const $q = useQuasar();

const getProject = async () => {
  $q.loading.show();
  await api.get(`/api/projects/${route.params.id}/edit`)
    .then(response => {
      // console.log(response);
      setTimeout(() => {
        project.value.name = response.data.name;
        project.value.sub_caption = response.data.sub_caption;
        project.value.url = response.data.url;
        project.value.github_url = response.data.github_url;
        project.value.caption = response.data.caption;
        project.value.tech = response.data.tech;
        project.value.type = response.data.type;
        $q.loading.hide();
      }, 300)

    }).catch(error => {
      console.log(error)
    });
}
const submitForm = () => {
  $q.loading.show();
  const newToken = LocalStorage.getItem("jwt");
  const form = uploadFiles(); // Prepare FormData

  // Ensure tech is a string
  let techString = String(project.value.tech);
  // Ensure tech is a string
  let typeString = String(project.value.type);

  // Add a space before each technology term
  const techWithSpaces = techString
    .split(',')
    .map(term => term.trim()) // Trim any extra spaces
    .map(term => ` ${term}`) // Add a single space before each term
    .join(','); // Join terms with a comma

  // Add a space before each technology term
  const typeWithSpaces = typeString
    .split(',')
    .map(term => term.trim()) // Trim any extra spaces
    .map(term => ` ${term}`) // Add a single space before each term
    .join(','); // Join terms with a comma


  form.append("name", project.value.name);
  form.append("url", project.value.url);
  form.append("github_url", project.value.github_url);
  form.append("caption", project.value.caption);
  form.append("sub_caption", project.value.sub_caption);
  form.append("tech", techWithSpaces.split(','));
  form.append("type", typeWithSpaces.split(','));


  // Send the request
  api.post(`/api/projects/${route.params.id}/update`, form, {
    headers: {
      Authorization: "Bearer " + newToken,
      "Content-Type": "multipart/form-data",
    },
  })
    .then(response => {
      console.log(response);
      if (response.data.status == 200) {
        setTimeout(() => {
          $q.notify({
            type: "positive",
            icon: "save",
            timeout: 3000,
            position: "top",
            message: response.data.message,
          });
          $q.loading.hide();
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
        }, 3000);
      }
    })
    .catch(error => {
      console.error(error);
      setTimeout(() => {
        $q.notify({
          type: "negative",
          icon: "error",
          timeout: 3000,
          position: "top",
          message: "Error! Please report to your IT support.",
        });
        $q.loading.hide();
      })

    })
};

// Prepare files for upload
const uploadFiles = () => {
  const form = new FormData();

  // Append each file to FormData
  if (project.value.iconFile) {
    form.append('icon', project.value.iconFile);
  }
  if (project.value.imageFile) {
    form.append('image', project.value.imageFile);
  }

  return form; // Return the FormData object
};


const resetForm = () => {
  project.value = {
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
onMounted(() => {
  getProject();
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
