import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '../layout/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: BasicLayout,
    redirect: '/login',
    meta: {
      title: 'index'
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/popup/pages/login/index.vue'),
        meta: {
          title: 'index'
        }
      },
      {
        path: '/regist',
        name: 'regist',
        component: () => import('@/popup/pages/regist/index.vue'),
        meta: {
          title: 'index'
        }
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('@/popup/pages/test/index.vue'),
        meta: {
          title: 'index'
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  next()
  // chrome.cookies.get(
  //   {
  //     url: 'https://www.google.com.hk/',
  //     name: 'login'
  //   },
  //   (cookie) => {
  //     if (cookie) {
  //       if (to.name !== 'test') {
  //         next({ name: 'test' })
  //       } else {
  //         next()
  //       }
  //     } else {
  //       next()
  //     }
  //   }
  // )
})
export default router
