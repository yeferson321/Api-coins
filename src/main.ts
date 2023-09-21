import { createApp } from 'vue'
import router from './router/main'
import './style.css'
import App from './App.vue'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

createApp(App).use(router).use(FloatingVue, {
    themes: {
        'tooltip': {
            delay: {
              show: 50,
              hide: 200,
            },
            distance: 9,
        }
    },
}).mount('#app')