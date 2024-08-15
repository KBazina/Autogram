import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfilePage from "../views/ProfilePage.vue";
import store from "@/store";
const routes = [
  {
    path: "/profil/:username",
    name: "profil",
    component: ProfilePage,
    meta: {
      needsUser: true,
      needsDoneProfile: true,
    },
  },
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
    path: "/tester",
    name: "tester",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/tester.vue"),
    meta: {
      needsUser: true,
      needsDoneProfile: true,
    },
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
  {
    path: "/cup",
    name: "cup",
    meta: {
      needsUser: true,
      needsDoneProfile: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/cup.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
