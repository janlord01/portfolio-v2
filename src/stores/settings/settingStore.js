import { defineStore } from 'pinia';
import { Loading, Notify, setCssVar } from 'quasar';
import { api } from 'src/boot/axios';

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
  }),
  getters: {

  },
  actions: {
    changeThemeColor(){
      setCssVar('primary', this.settingsData.theme_color || '#DF542B')
    },
    async getSetting() {
      this.loading = true;

      await api.get('/api/settings')
      .then(response =>{
        this.settingsData = response.data;
        this.loading = false
        this.changeThemeColor()

      }).catch(error =>{
        console.error(error)
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
