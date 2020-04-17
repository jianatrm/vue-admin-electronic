import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/certificate',
    component: Layout,
    redirect: '/certificate/certificatelist',
    meta: { title: '证照管理', icon: 'example',id:101 },
    children: [
      {
        path: 'certificatelist',
        name: 'certificatelist',
        component: () => import('@/views/certificate/certificatelist'),
        meta: { title: '证件列表', icon: 'table',id:102 }
      },
      {
        path: 'fillinglist',
        name: 'fillinglist',
        component: () => import('@/views/certificate/fillinglist'),
        meta: { title: '加注件列表', icon: 'tree',id:103 }
      }
    ]
  },

  {
    path: '/directorymanage',
    component: Layout,
    redirect: '/directorymanagelist',
    meta: { title: '目录管理', icon: 'example',id:201 },
    children: [
      {
        path: 'directorymanagelist',
        name: 'directorymanagelist',
        component: () => import('@/views/directorymanage/directorymanagelist'),
        meta: { title: '目录列表', icon: 'form',id:202 }
      }
    ]
  },
  {
    path: '/electronic',
    component: Layout,
    redirect: '/eleCertificatelist',
    meta: { title: '证照资源库管理', icon: 'example',id:301 },
    children: [
      {
        path: 'eleCertificatelist',
        name: 'eleCertificatelist',
        component: () => import('@/views/electronic/eleCertificatelist'),
        meta: { title: '电子证照目录', icon: 'table',id:302 }
      },
      {
        path: 'electronicinfo',
        name: 'electronicinfo',
        component: () => import('@/views/electronic/eleCertificate'),
        meta: { title: '电子证照', icon: 'tree',id:303 }
      }
    ]
  },
  {
    path: '/usermanage',
    component: Layout,
    redirect: '/rolemanage',
    meta: { title: '内部用户管理', icon: 'example',id:401 },
    children: [
      {
        path: 'rolemanage',
        name: 'rolemanage',
        component: () => import('@/views/usermanage/rolemanage'),
        meta: { title: '角色管理', icon: 'table',id:402 }
      },
      {
        path: 'functionmanage',
        name: 'functionmanage',
        component: () => import('@/views/usermanage/functionmanage'),
        meta: { title: '职能管理', icon: 'tree',id:403 }
      },
      {
        path: 'departmanage',
        name: 'departmanage',
        component: () => import('@/views/usermanage/departmanage'),
        meta: { title: '用户管理', icon: 'tree',id:404 }
      }
    ]
  },
  {
    path: '/certificatesetting',
    component: Layout,
    redirect: '/certificatetype',
    meta: { title: '证照类型', icon: 'example',id:501 },
    children: [
      {
        path: 'certificatetype',
        name: 'certificatetype',
        component: () => import('@/views/certificatetype/certificatetype'),
        meta: { title: '证照类型设置', icon: 'form',id:502 }
      }
    ]
  },
  {
    path: '/securitysetting',
    component: Layout,
    redirect: '/passwordrules',
    meta: { title: '安全设置', icon: 'example' },
    children: [
      {
        path: 'passwordrules',
        name: 'passwordrules',
        component: () => import('@/views/certificate/certificatelist'),
        meta: { title: '密码规则', icon: 'table' }
      },
      {
        path: 'logoutsetting',
        name: 'logoutsetting',
        component: () => import('@/views/certificate/fillinglist'),
        meta: { title: '超时登出', icon: 'tree' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]



const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
