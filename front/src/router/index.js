import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home'
import Docs from '../views/Docs.vue'

const path = '/' 

export default createRouter({
  history: createWebHistory(path),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/docs',
      name: 'Docs',
      component: Docs,
    },
    {
      path: '/docs/:slug',
      name: 'Doc',
      props: true,
      component: Docs,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Home',
      component: Home,
    },
  ],
})


