import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  /* -------登录页------- */
  {
    path: "/user",
    children: [
      {
        path: "/user/login",
        name: "login",
        // 对应的组件使用异步加载
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/Login.vue")
      }
    ]
  },
  /* -------首页------- */
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
