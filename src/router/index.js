import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      needsUser: true,
      needsDoneProfile: true,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/signup.vue"),
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/profileDetails",
    name: "profileDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/profileDetails.vue"),
    meta: {
      needsUser: true,
      profiler: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      needsUser: true,
      needsDoneProfile: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/profile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
