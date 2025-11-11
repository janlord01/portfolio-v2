import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layoutStore", {
  state: () => ({
    header: true,
  }),
  getters: {
    getHeader: (state) => {
      return state.header;
    },
  },
  actions: {},
});
