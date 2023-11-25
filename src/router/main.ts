import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

// importing the components for the routes.
const CoinsComponent = () => import('../components/coins/Coins.vue');
const FavoritesComponent = () => import('../components/favorites/Favorites.vue');

// Defines the routes and associates each route with its corresponding component for rendering.
const routes: RouteRecordRaw[] = [
    { path: '/', name: 'coins', component: CoinsComponent },
    { path: '/favorites', name: 'favorites', component: FavoritesComponent },
    { path: '/:noPage(.*)', redirect: '/' } // Redirect any undefined path to the main page.
];

// Creates the router instance.
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;