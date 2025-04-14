import { defineStore } from 'pinia';
import { Loading, LocalStorage, Notify, setCssVar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

export const useSettingsStore = defineStore('settingsStore', {
  state: () => ({
    settingsData: [
      {
        position: '',
        caption: '',
        tech_title: '',
        theme_color: '',
      }
    ],
    loading: true,
    router: useRouter()
  }),
  getters: {

  },
  actions: {
    changeThemeColor(){
      console.log(this.settingsData.theme_color)

      setCssVar('primary', this.settingsData.theme_color || '#DF542B')
    },
    async getSetting() {
      this.loading = true;

      await api.get('/api/settings')
      .then(response =>{
        console.log(response);
        this.settingsData = response.data;
        this.loading = false

      }).catch(error =>{
        console.log(error)
        setTimeout(() =>{
          Notify.create({
            position: 'top',
            type:"negative",
            timeout: 3000,
            message: "Error, Contact your IT support!"
          });

          this.loading = false
          Loading.hide();
        },3000)
      })
    },

  },
});
