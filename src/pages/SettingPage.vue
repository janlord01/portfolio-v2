<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-form @submit="submitForm">
        <q-card-section>
          <div class="text-h6">Settings</div>
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="settingStore.settingsData.position" label="Position" required />
          <q-input filled v-model="settingStore.settingsData.caption" label="Caption" class="q-mt-md" />

          <q-input filled v-model="settingStore.settingsData.tech_title" label="Tech Title" class="q-mt-md q-mb-md" required />
          <q-input
            filled
            v-model.number="settingStore.settingsData.minimum_reviews_to_display"
            label="Minimum reviews to display"
            type="number"
            min="0"
            hint="0 = show Reviews tab when at least 1 approved; e.g. 3 = show when 3+ approved"
            class="q-mt-md"
          />
          <q-toggle
            v-model="displayCardImages"
            label="Display images on project/experience cards"
            class="q-mt-md"
          />
          <label>Theme Color</label>
          <q-color
            v-model="themeColor"
            label="Theme Color"
            default-view="spectrum"
            class="q-mt-md q-mb-md"
            required
          />
          <q-btn type="submit" label="Update" :loading="loading" color="primary" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useUserStore } from 'src/stores/user/userStore';
import { useSettingsStore } from 'src/stores/settings/settingStore';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const userStore = useUserStore();
const settingStore = useSettingsStore();
const loading = ref(false);

// New reactive variable for theme color
const themeColor = ref(settingStore.settingsData.theme_color); // Default color as hex

// Display card images (default true)
const displayCardImages = ref(settingStore.settingsData.display_card_images !== false);

// Watcher to ensure themeColor is always a hex string
watch(themeColor, (newColor) => {
  settingStore.settingsData.theme_color = convertToHex(newColor);
});

watch(displayCardImages, (val) => {
  settingStore.settingsData.display_card_images = val;
});

// Helper method to convert to hex
const convertToHex = (color) => {
  if (typeof color === 'object') {
    const { r, g, b } = color;
    return (
      '#' +
      ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()
    );
  }
  return color; // If already hex, return it as is
};

const submitForm = async () => {
  loading.value = true;
  const formData = new FormData();
  formData.append('caption', settingStore.settingsData.caption);
  formData.append('position', settingStore.settingsData.position);
  formData.append('tech_title', settingStore.settingsData.tech_title);
  formData.append('theme_color', settingStore.settingsData.theme_color);
  if (settingStore.settingsData.minimum_reviews_to_display !== undefined && settingStore.settingsData.minimum_reviews_to_display !== null) {
    formData.append('minimum_reviews_to_display', settingStore.settingsData.minimum_reviews_to_display);
  }
  formData.append('display_card_images', settingStore.settingsData.display_card_images !== false ? '1' : '0');

  await api.post('/api/settings', formData)
    .then(response => {
      if (response.data.status == 200) {
        setTimeout(() => {
          $q.notify({
            position: 'top',
            type: 'positive',
            timeout: 3000,
            message: response.data.message
          });
          loading.value = false;
          settingStore.changeThemeColor();
        }, 500);
      } else {
        setTimeout(() => {
          $q.notify({
            position: 'top',
            type: 'negative',
            timeout: 3000,
            message: response.data.message
          });
          loading.value = false;
        }, 3000);
      }
    }).catch(error => {
      setTimeout(() => {
        $q.notify({
          position: 'top',
          type: 'negative',
          timeout: 3000,
          message: "Something went wrong, please contact your IT support!"
        });
        loading.value = false;
      }, 3000);
    });
};

onMounted(async () => {
  await settingStore.getSetting();
  displayCardImages.value = settingStore.settingsData.display_card_images !== false;
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
