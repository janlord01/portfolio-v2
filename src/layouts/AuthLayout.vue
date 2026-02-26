<template>
  <q-layout class="bg-grey-1">
    <q-header elevated class="text-white bg-primary" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md">
        <!-- <q-btn round dense flat :ripple="false" :icon="fabGithub" size="19px" color="white" class="q-mr-sm" no-caps /> -->
        <router-link :to="'/'">
          <q-img src="/images/janlord.png" width="50px" />
        </router-link>
        <!-- <q-select
          ref="search" dark dense standout use-input hide-selected
          class="GL__toolbar-select"
          color="black" :stack-label="false" label="Search or jump to..."
          v-model="text" :options="filteredOptions" @filter="filter"
          style="width: 300px"
        >

          <template v-slot:append>
            <img src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg">
          </template>

          <template v-slot:no-option>
            <q-item>
              <q-item-section>
                <div class="text-center">
                  <q-spinner-pie
                    color="grey-5"
                    size="24px"
                  />
                </div>
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              class="GL__select-GL__menu-link"
            >
              <q-item-section side>
                <q-icon name="collections_bookmark" />
              </q-item-section>
              <q-item-section>
                <q-item-label />
              </q-item-section>
              <q-item-section side :class="{ 'default-type': !scope.opt.type }">
                <q-btn outline dense no-caps text-color="blue-grey-5" size="12px" class="bg-grey-1 q-px-sm">
                  {{ scope.opt.type || 'Jump to' }}
                  <q-icon name="subdirectory_arrow_left" size="14px" />
                </q-btn>
              </q-item-section>
            </q-item>
          </template>
        </q-select> -->

        <div class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap">

          <q-btn  to="/projects" class="text-white" label="Projects" no-caps dense flat />
          <q-btn  to="/experiences" class="text-white" label="Experiences" no-caps dense flat />
          <q-btn  to="/tech-stack" class="text-white" :label="settingStore.settingsData.tech_title ? settingStore.settingsData.tech_title : 'Tech Stack'" no-caps dense flat />
          <q-btn  to="/reviews" class="text-white" label="Reviews" no-caps dense flat />
          <!-- <a href="javascript:void(0)" class="text-white">
            Experiences
          </a> -->
          <!-- <a href="javascript:void(0)" class="text-white">
            Marketplace
          </a>
          <a href="javascript:void(0)" class="text-white">
            Explore
          </a> -->
        </div>

        <q-space />

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <!-- <q-btn  dense flat round size="sm" icon="notifications" /> -->
          <q-btn  dense flat>
            <div class="row items-center no-wrap">
              <q-icon name="add" size="20px" />
              <q-icon name="arrow_drop_down" size="16px" style="margin-left: -2px" />
            </div>
            <q-menu auto-close>
              <q-list dense style="min-width: 150px">
                <q-item clickable to="/add-project" class="GL__menu-link">
                  <q-item-section>New project</q-item-section>
                </q-item>
                <q-item clickable to="/add-experience" class="GL__menu-link">
                  <q-item-section>New experience</q-item-section>
                </q-item>

                <q-item clickable to="/add-tech-stack" class="GL__menu-link">
                  <q-item-section>New {{ settingStore.settingsData.tech_title ? settingStore.settingsData.tech_title.toLowerCase() : settingStore.settingsData.tech_title || 'tech stack' }} </q-item-section>
                </q-item>
                <q-item clickable to="/reviews" class="GL__menu-link">
                  <q-item-section>New review</q-item-section>
                </q-item>
                <!-- <q-item clickable class="GL__menu-link">
                  <q-item-section>New gist</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>New organization</q-item-section>
                </q-item>
                <q-separator />
                <q-item-label header>This repository</q-item-label>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>New issue</q-item-section>
                </q-item> -->
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn dense flat no-wrap>
            <q-avatar rounded size="20px">
              <img :src="userStore.userData.profile_image ? userStore.userData.profile_image : '/images/janlord.png'">
            </q-avatar>
            <q-icon name="arrow_drop_down" size="16px" />

            <q-menu auto-close>
              <q-list dense>
                <q-item active-class="text-primary" class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div>Signed in as <strong>{{ userStore.userData.name.split(" ")[0] }}</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-separator />
                <q-item active-class="text-primary " clickable to="/profile" class="GL__menu-link">
                  <q-item-section>Your profile</q-item-section>
                </q-item>
                <q-item active-class="text-primary" clickable to="/projects" class="GL__menu-link">
                  <q-item-section>Your projects</q-item-section>
                </q-item>
                <q-item active-class="text-primary" clickable to="/experiences" class="GL__menu-link">
                  <q-item-section>Your experiences</q-item-section>
                </q-item>
                <q-item active-class="text-primary" clickable to="/tech-stack" class="GL__menu-link">
                  <q-item-section>Your {{ settingStore.settingsData.tech_title ? settingStore.settingsData.tech_title.toLowerCase() : settingStore.settingsData.tech_title || 'tech stack' }}</q-item-section>
                </q-item>
                <q-item active-class="text-primary" clickable to="/reviews" class="GL__menu-link">
                  <q-item-section>Your reviews</q-item-section>
                </q-item>

                <q-item active-class="text-primary" clickable to="/settings" class="GL__menu-link">
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link" @click="logout">
                  <q-item-section>Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-footer class="q-pa-md bg-primary q-mt-lg">
      <div class="text-body2">Created By: <a class="text-white" style="text-decoration: none;" href="https://janlordluga.com/" target="_blank">Janlord Luga</a></div>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { fabGithub } from '@quasar/extras/fontawesome-v6'
import { useUserStore } from 'src/stores/user/userStore';
import { useSettingsStore } from 'src/stores/settings/settingStore';

const stringOptions = [
  'quasarframework/quasar',
  'quasarframework/quasar-awesome'
]

export default {
  name: 'MyLayout',
  mounted(){
    setTimeout(() =>{
      this.settingStore.getSetting();
      this.settingStore.changeThemeColor();
    },300)
  },
  setup () {

    const settingStore = useSettingsStore();
    const text = ref('')
    const options = ref(null)
    const filteredOptions = ref([])
    const search = ref(null) // $refs.search
    const userStore = useUserStore();
    const logout = () =>{
      userStore.userLogout();
    }
    function filter (val, update) {
      if (options.value === null) {
        // load data
        setTimeout(() => {
          options.value = stringOptions
          search.value.filter('')
        }, 2000)
        update()
        return
      }

      if (val === '') {
        update(() => {
          filteredOptions.value = options.value.map(op => ({ label: op }))
        })
        return
      }

      update(() => {
        filteredOptions.value = [
          {
            label: val,
            type: 'In this repository'
          },
          {
            label: val,
            type: 'All GitHub'
          },
          ...options.value
            .filter(op => op.toLowerCase().includes(val.toLowerCase()))
            .map(op => ({ label: op }))
        ]
      })
    }

    return {
      fabGithub,
      logout,
      text,
      options,
      filteredOptions,
      search,
      userStore,
      filter,
      settingStore
    }
  }
}
</script>

<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden

    &:hover
      background: #DF542B
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible

  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7

  &__menu-link:hover
    background: #DF542B
    color: white

  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important

  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9

  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
