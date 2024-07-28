import useAuthStore from "@/stores/modules/auth";
import { createRouter, createWebHashHistory,  } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    //映射关系： path --> component
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            component: () => import("@/views/home/home.vue")
        },
        {
            path: "/favor",
            component: () => import("@/views/favor/favor.vue"),
            meta: { requiresAuth: true }
        },
        {
            path: "/order",
            component: () => import("@/views/order/order.vue"),
            meta: { requiresAuth: true }
        },
        {
            path: "/message",
            component: () => import("@/views/message/message.vue"),
            meta: { requiresAuth: true }
        },
        {
            path: "/city",
            component: () => import("@/views/city/city.vue"),
            // meta: {
            //     hideTabBar: true
            // }
        },
        {
            path: "/search",
            component: () => import("@/views/search/search.vue"),
        },
        {
            path: "/detail/:id",
            component: () => import("@/views/detail/detail.vue"),
        },
        {
            path: "/login",
            component: () => import("@/views/login/login.vue")
        }, 
    ]
})

// 导航守卫
// router.beforeEach((to, from, next) => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 检查登录状态
//   console.log(isLoggedIn); 
//   if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
//     next({ path: '/login' });
//   } else {
//     next();
//   }
// });
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' // 检查登录状态
  authStore.setLoginStatus(isLoggedIn) // 更新 Pinia 状态
  console.log(authStore.isLoggedIn)

  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isLoggedIn) {
    next({ path: '/login' });
  } else {
    next()
  }
})

export default router