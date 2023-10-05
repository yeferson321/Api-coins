import { createApp } from 'vue';
import router from './router/main';
import './style.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(FloatingVue, {
    themes: {
        'tooltip': {
            triggers: ['focus', 'hover'],
            delay: {
                show: 0,
                hide: 200,
            },
            distance: 9,
            autoHide: true,
            placement: 'top',
            autoSize: 'min',
        }
    },
}).mount('#app');