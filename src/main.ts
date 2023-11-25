import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/main';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';
import './style.css';

// Use Pinia for global state management.
const pinia = createPinia();

createApp(App)
.use(pinia) // Use Pinia for global state.
.use(router) // Use the router.
.use(FloatingVue, { // Theme settings for tooltips.
    themes: {
        'tooltip': {
            triggers: ['focus', 'hover'],
            delay: {
                show: 0,
                hide: 50,
            },
            distance: 9,
            autoHide: true,
            placement: 'top',
            autoSize: 'min'
        }
    },
}).mount('#app');