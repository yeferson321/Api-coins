import { Ref, ref } from "vue";

// Determines if the route is the favorites page.
export const identifyRoute: Ref<boolean> = ref(window.location.pathname === "/favorites")