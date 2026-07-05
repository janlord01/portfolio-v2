import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { api } from 'src/boot/axios';
import { LocalStorage } from 'quasar';
import { useUserStore } from 'src/stores/user/userStore';

const Router = createRouter({
  history: createWebHistory(),
  routes,
});

Router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userStore = useUserStore();
  const token = LocalStorage.getItem('jwt');
  if (requiresAuth){
    if (token) {
        api.get('/api/user')
        .then(response =>{
          userStore.userData = response.data;
        }).catch(error =>{
          console.error(error)
        });
        next();
    } else {
      next({ name: 'login' }); // Redirect to login if no token found
      LocalStorage.removeItem('jwt')
    }
  } else {
    next();
  }
});

export default Router;

