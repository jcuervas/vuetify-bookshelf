import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: { name: "Books" },
    children: [
      {
        path: "books",
        name: "Books",
        redirect: { name: "List" },
        component: () => import("@/views/MainLayout.vue"),
        children: [
          {
            path: "",
            name: "List",
            component: () => import("@/views/books/List.vue"),
          },
          {
            path: "create",
            name: "Create",
            component: () => import("@/views/books/Create.vue"),
          },
          {
            path: ":id",
            name: "Detail",
            component: () => import("@/views/books/Detail.vue"),
          },
        ],
      },
    ],
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next();
        return;
      }
      return next({ name: "Auth" });
    },
  },
  {
    path: "/auth",
    name: "Auth",
    redirect: { name: "Login" },
    component: () => import("../views/MainLayout.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("../views/auth/Login.vue"),
      },
    ],
    beforeEnter(to, from, next) {
      return (
        (store.getters.isAuthenticated && next({ name: "Home" })) || next()
      );
    },
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
