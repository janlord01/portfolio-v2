<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-form @submit="submitForm">
        <q-card-section>
        <q-toolbar>
          <q-toolbar-title class="text-h6">
            Profile
          </q-toolbar-title>
          <q-btn
              label="Change Profile Image"
              color="primary"
              outline
              icon="image"
              @click="changeDialogDunc"
            />
        </q-toolbar>
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="userStore.userData.name" label="Name" required />
          <q-input filled v-model="userStore.userData.email" label="Email" class="q-mt-md" type="email"  />
          <q-input filled v-model="userStore.userData.title" label="Title" class="q-mt-md" hint="e.g., Software Engineer specializing in Vue.js, Laravel, and WordPress" />
          <q-editor
            v-model="userStore.userData.about"
            class="q-mt-md"
            min-height="10rem"
            placeholder="Enter your about me content here..."
          />
          <q-input filled v-model="userStore.userData.address" label="Address" type="textarea" class="q-mt-md q-mb-md" required />
          <q-input filled v-model="userStore.userData.cv" label="CV Link" class="q-mt-md q-mb-md" />
          <q-btn type="submit" label="Update" color="primary" :loading="loadingBtn" />

        </q-card-section>
      </q-form>
    </q-card>

    <q-dialog v-model="showChangeDialog" persistent>
      <ChangeImage @hide-change-dialog="showChangeDialog = !showChangeDialog" />
    </q-dialog>
  </q-page>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from 'src/stores/user/userStore';
import { api } from 'src/boot/axios';
import ChangeImage from 'src/components/ChangeProfileImage.vue';
import { useQuasar } from 'quasar';


const userStore = useUserStore();
const showChangeDialog = ref(false);

const changeDialogDunc = () =>{
  showChangeDialog.value = true
}

const iconPreview = ref(null);
const imagePreview = ref(null);
const loadingBtn = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const iconFileInput = ref(null);
const imageFileInput = ref(null);
const $q = useQuasar();
const submitForm = async () => {
  loadingBtn.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  const formData = new FormData();
  formData.append('name', userStore.userData.name);
  formData.append('email', userStore.userData.email);
  formData.append('title', userStore.userData.title || '');
  formData.append('about', userStore.userData.about || '');
  formData.append('address', userStore.userData.address);
  formData.append('cv', userStore.userData.cv);


  await api.post('/api/users/update', formData
  ).then(response =>{
    console.log(response)
    if(response.data.status == 200){
      setTimeout(() =>{
        $q.notify({
          position: 'top',
          type:'positive',
          timeout:3000,
          message: response.data.message
        });
        loadingBtn.value = false;

      },500)
    }else{
      setTimeout(() =>{
        $q.notify({
          position: 'top',
          type:'negative',
          timeout:3000,
          message: response.data.message
        });
        loadingBtn.value = false;

      },3000)
    }
  }).catch(error =>{
    console.log(error)
    setTimeout(() =>{
        $q.notify({
          position: 'top',
          type:'negative',
          timeout:3000,
          message: "Something went wrong, please contact your IT support!"
        });
        loadingBtn.value = false;
      },3000)
  });

};

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
