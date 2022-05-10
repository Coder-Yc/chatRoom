import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../components/main.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

// router.beforeEach((to) => {
  // console.log(to.name);
//   if (to.name !== "login") {
//     const token = LocalCatch.getcatch("token");
//     // console.log(token);
//     if (!token) {
//       return "/login";
//     }
//   }
// });

export default router;
