import {createRouter, createWebHistory} from "vue-router";
import HomeContentTwo from "@/components/HomeContentTwo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeContentTwo,
    },
    {
      path: "/counteropt",
      name: "counteropt",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/CounterOptionApi.vue"),
    },
    {
      path: "/countercomp",
      name: "countercomp",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/CounterComposition.vue"),
    },
    {
      path: "/cardview",
      name: "cardview",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].jss) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/CardView.vue"),
    },
    {
      path: "/gaveup",
      name: "gaveup",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].jss) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/HomePage.vue"),
    },
  ],
});

export default router;
