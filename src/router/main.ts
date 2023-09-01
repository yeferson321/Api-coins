import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

// This code is defining the routes for a Vue.js router.
const routes: RouteRecordRaw[] = [
    { path: '/', alias: '/home', name: 'home', component: () => import('../components/home/Home.vue') }, 
    { path: '/:noPage(.*)', name: 'noPage', redirect: '/' }
]

/* This code is creating a Vue.js router instance using the `createRouter` function from the
`vue-router` library. The `createWebHistory` function is used to create a history object that is
passed to the router instance. The `routes` array contains the route configurations for the router.
Finally, the `router` instance is exported as the default export of the module. */
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;