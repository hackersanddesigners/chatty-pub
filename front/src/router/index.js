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
      path: '/:pathMatch(.*)*',
      name: 'Home',
      component: Home,
    },
  ],
})


