import AddProjectPage from 'src/pages/AddProjectPage.vue'
import EditProjectPage from 'src/pages/EditProjectPage.vue'
import ProjectListPage from 'src/pages/ProjectPage.vue';;
import ExperiencePage from 'src/pages/ExperiencePage.vue'
import AddExperiencePage from 'src/pages/AddExperiencePage.vue';
import EditExperiencePage from 'src/pages/EditExperiencePage.vue';
import LoginPage from 'src/pages/LoginPage.vue';
import ProfilePage from 'src/pages/ProfilePage.vue';
import SettingPage from 'src/pages/SettingPage.vue';
import TechStackPage from 'src/pages/TechStackPage.vue';
import AddTechStack from 'src/pages/AddTechStack.vue';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      {
        path: '/login',
        component: LoginPage,
        name: 'login'
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      /**
       *
       * Project Route
       *
       */
      {
        path: '/projects',
        component: ProjectListPage,
        name: 'ProjectPage'
      },
      {
        path: '/add-project',
        component: AddProjectPage,
        name: 'AddProjectPage'
      },
      {
        path: '/project/:id/edit',
        component: EditProjectPage,
        name: 'EditProjectPage'
      },
      /**
       *
       * Experience Route
       *
       */
      {
        path: '/experiences',
        component: ExperiencePage,
        name: 'ExperiencePage'
      },
      {
        path: '/add-experience',
        component: AddExperiencePage,
        name: 'AddExperiencePage'
      },
      {
        path: '/experience/:id/edit',
        component: EditExperiencePage,
        name: 'EditExperiencePage'
      },
      /**
       *
       * Tech Stack Route
       *
       */
      {
        path: '/tech-stack',
        component: TechStackPage,
        name: 'TechStackPage'
      },

      {
        path: '/add-tech-stack',
        component: AddTechStack,
        name: 'AddTechStack'
      },

      {
        path: '/profile',
        component: ProfilePage,
        name: 'profile'
      },
      {
        path: '/settings',
        component: SettingPage,
        name: 'settings'
      },

    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    name: 'page404'
  }
]

export default routes
