import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/main.css';

// 개발 환경에서만 로깅 활성화
if (import.meta.env.DEV) {
  console.log('Development mode activated');
  console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
}

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app'); 