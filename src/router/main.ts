import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

// Import of components for routes
const CoinsComponent = () => import('../components/coins/Coins.vue');
const FavoritesComponent = () => import('../components/favorites/Favorites.vue');

// Definition of the routes
const routes: RouteRecordRaw[] = [
    { path: '/', name: 'coins', component: CoinsComponent },
    { path: '/favorites', name: 'favorites', component: FavoritesComponent },
    { path: '/:noPage(.*)', redirect: '/' } // Redirect any undefined path to the main page
];

// Router creation
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;