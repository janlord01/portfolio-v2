import { defineStore } from "pinia";
import { Loading, LocalStorage, Notify } from "quasar";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: [],
    loading: true,
  }),
  getters: {},
  actions: {
    async getUserData() {
      await api
        .get("/api/users")
        .then((response) => {
          console.log(response);
          if (response.data != "guest") {
            this.userData = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async loginUser(payload) {
      const router = useRouter();
      Loading.show({ message: "Please wait..." });

      await api
        .post("/api/login", {
          email: payload[0],
          password: payload[1],
        })
        .then((response) => {
          if (response.data.status == 200) {
            const { user, token } = response.data;
            LocalStorage.setItem("jwt", token);
            this.userData = user;
            Notify.create({
              position: "top",
              type: "positive",
              timeout: 3000,
              message: "Logged In!",
            });
            Loading.hide();
            setTimeout(() => {
              window.location = "/projects";
            }, 500);
          }else{
            Notify.create({
              position: "top",
              type: "negative",
              timeout: 3000,
              message: response.data.message,
            });
            Loading.hide();
          }
        })
        .catch((error) => {
          console.log(error);
          Notify.create({
            position: "top",
            type: "negative",
            timeout: 3000,
            message: "Invalid Credentials",
          });
          Loading.hide();
        });
    },

    async userLogout() {
      await api
        .post("/api/logout")
        .then((response) => {
          // console.log(response)
          setTimeout(() => {
            Notify.create({
              position: "top",
              type: "positive",
              timeout: 3000,
              message: "Logout Successfully!",
            });
          }, 500);
          setTimeout(() => {
            LocalStorage.remove("jwt");
            window.location = "/";
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
