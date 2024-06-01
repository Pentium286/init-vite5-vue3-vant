import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {
      name: 'hairTestReport',
    },
  },
  {
    path: '/hairTestReport',
    name: 'hairTestReport',
    component: () => import("@/views/hairTestReport/index.vue"),
    meta: {
      title: '毛囊检测报告',
    }
  },
  {
    path: '/sproutLog',
    name: 'sproutLog',
    component: () => import("@/views/hairTestReport/sproutLog/index.vue"),
    meta: {
      title: '发芽日志',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // base: import.meta.env.BASE_URL,
  routes: routes,
});

export default router;