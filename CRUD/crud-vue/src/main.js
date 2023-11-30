import { createApp } from 'vue';
import App from './App.vue';
import Paginate from 'vuejs-paginate-next';

const app = createApp(App);

app.component('paginate-app', Paginate);

app.mount('#app');