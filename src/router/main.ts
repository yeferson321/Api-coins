import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
    { path: '/', alias: '/coins', name: 'coins', component: () => import('../components/coins/Coins.vue') },
    { path: '/favorites', alias: '/favorites', name: 'favorites', component: () => import('../components/favorites/Favorites.vue') },
    { path: '/:noPage(.*)', name: 'noPage', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;