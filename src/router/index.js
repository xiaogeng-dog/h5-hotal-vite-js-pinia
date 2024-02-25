import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/favor',
      component: () => import('../views/favor/index.vue')
    },
    {
      path: '/order',
      component: () => import('../views/order/index.vue')
    },
    {
      path: '/message',
      component: () => import('../views/message/index.vue')
    },
    {
      path: '/city',
      component: () => import('../views/city/index.vue')
    },
    {
      path: '/detail/:id',
      component: () => import('../views/detail/detail.vue')
    },
    {
      path: '/search',
      component: () => import('../views/search/index.vue'),
      meta: {
        hideTabBar: true // 是否隐藏首页的tabbar; 默认为 false
      }
    }
  ]
})

export default router
