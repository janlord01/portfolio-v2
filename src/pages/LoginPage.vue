<template>
  <q-page class="q-pa-md flex flex-center">

    <q-card class="q-pa-md" style="max-width: 400px; width: 100%;">
      <q-card-section class="text-center">
        <q-img src="/images/janlord.png" width="200px" />
      </q-card-section>
      <q-card-section>
        <div class="text-h6 text-left">Login</div>

      </q-card-section>

      <q-form @submit="submitLogin">
        <q-card-section>
          <q-input v-model="email" label="Email" type="email" filled required class="q-mb-md">
            <template v-slot:prepend>
              <q-icon name="eva-email-outline" />
            </template>
          </q-input>

          <q-input v-model="password" label="Password" :type="isPwd ? 'password' : 'text'" filled required>
            <template v-slot:prepend>
              <q-icon name="password" />
            </template>
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section>
          <q-btn type="submit" label="Login" color="primary" unelevated class="full-width q-mb-md" />
        </q-card-section>

      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from 'src/stores/user/userStore';

const userStore = useUserStore();

const email = ref('');
const password = ref('');
const isPwd = ref(true)


const submitLogin = async () => {
  userStore.loginUser([email.value, password.value]);
};

</script>

<style scoped>
.q-pa-md {
  padding: 16px;
}

.q-mb-md {
  margin-bottom: 16px;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
