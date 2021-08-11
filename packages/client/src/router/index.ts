import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/challenge/active',
    name: 'ChallengeActive',
    component: () => import('../views/ChallengeActive.vue'),
  },
  {
    path: '/challenge/new',
    name: 'ChallengeNew',
    component: () => import('../views/ChallengeNew.vue'),
  },
  {
    path: '/challenge/result',
    name: 'ChallengeResult',
    component: () => import('../views/ChallengeResult.vue'),
  },
  {
    path: '/task/archive',
    name: 'TaskArchive',
    component: () => import('../views/TaskArchive.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
