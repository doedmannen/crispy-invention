import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/list/:id",
    name: "List",
    component: () => import("@/views/List.vue")
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import("@/views/EditItem.vue")
  },
  {
    path: "*",
    component: () => import("@/views/Home.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
