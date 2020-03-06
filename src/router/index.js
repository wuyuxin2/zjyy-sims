import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/user",
    hideInMenu: true
  },
  /* -------登录页------- */
  {
    path: "/user",
    name: "user",
    hideInMenu: true,
    component: () => import("../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () => import("../views/User/Login.vue")
      }
    ]
  },
  /* -------首页------- */
  {
    path: "/home",
    name: "Home",
    meta: {
      icon: "home",
      title: "首页"
    },
    component: () => import("../views/Home.vue")
  },
  /* -------手术中心------- */
  {
    path: "/operator-center",
    name: "operator-center",
    meta: {
      icon: "experiment",
      title: "手术中心"
    },
    component: () => import("../layouts/BasicLayout.vue"),
    children: [
      {
        path: "/operator-center",
        redirect: "/operator-center/specimen-oproom"
      },
      {
        path: "/operator-center/specimen-oproom",
        name: "specimen-oproom",
        meta: {
          icon: "scissor",
          title: "取标手术间"
        },
        component: () => import("../views/OperatorCenter/SpecimenOproom.vue")
      },
      {
        path: "/operator-center/specimen-surgerycollect",
        name: "specimen-surgerycollect",
        meta: {
          icon: "scissor",
          title: "存标标本间"
        },
        component: () =>
          import("../views/OperatorCenter/SpecimenSurgerycollect.vue")
      },
      {
        path: "/operator-center/schedule-report",
        name: "schedule-report",
        meta: {
          icon: "file-text",
          title: "手术通知单"
        },
        component: () => import("../views/OperatorCenter/ScheduleReport.vue")
      }
    ]
  },
  /* -------404------- */
  {
    path: "*",
    hideInMenu: true,
    component: () => import("../views/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, form, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
