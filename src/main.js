import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'amfe-flexible';
import '@vant/touch-emulator';

import 'vant/lib/index.css';
import Vant from 'vant';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(Vant);
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

app.mount('#app');
