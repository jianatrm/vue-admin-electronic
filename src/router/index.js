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
      meta: { title: '首页', icon: 'iconfont icon-shouye',id:402 }
    }]
  },
  {
    path: '/dept',
    component: Layout,
    redirect: '/departmanage',
    meta: { title: '部门管理', icon: 'example',id:403},
    children: [
      {
        path: 'deptmanage',
        name: 'deptmanage',
        component: () => import('@/views/dept/index'),
        meta: { title: '部门管理', icon: 'iconfont icon-ml',id:404 }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/usermanage',
    meta: { title: '人员', icon: 'example',id:405 },
    hidden:false,
    children: [
      {
        path: 'usermanage',
        name: 'usermanage',
        component: () => import('../views/user/index'),
        meta: { title: '人员管理', icon: 'iconfont icon-renyuanguanli',id:406 }
      },
    ]
  },


  {
    path: '/doc',
    component: Layout,
    redirect: '/mydoc',
    meta: { title: '我的文件', icon: 'example',id:408 },
    children: [
      {
        path: 'mydoc',
        name: 'mydoc',
        component: () => import('../views/doc/my-doc'),
        meta: { title: '我的文件', icon: 'iconfont icon-iconset0155',id:409 }
      },

    ]
  },
  {
    path: '/deptdoc',
    component: Layout,
    redirect: '/deptdoc',
    meta: { title: '部门文件', icon: 'example',id:410 },
    children: [
      {
        path: 'deptdoc',
        name: 'deptdoc',
        component: () => import('@/views/doc/dept-doc'),
        meta: { title: '部门文件', icon: 'iconfont icon-wendang',id:411 }
      }
    ]
  },

  {
    path: '/submit',
    component: Layout,
    redirect: '/submitdoc',
    meta: { title: '提交文件', icon: 'example',id:412 },
    children: [
      {
        path: 'submitdoc',
        name: 'submitdoc',
        component: () => import('../views/doc/submit-doc'),
        meta: { title: '提交文件', icon: 'iconfont icon-tijiaowendang',id:413 }
      }
    ]
  },

  {
    path: '/workorder',
    component: Layout,
    redirect: 'workdoc',
    meta: { title: '文件审批', icon: 'example',id:414 },
    children: [
      {
        path: 'workdoc',
        name: 'workdoc',
        component: () => import('@/views/workorder/work-doc'),
        meta: { title: '文件审批', icon: 'iconfont icon-shenqingshenpi',id:415 }
      },
      {
        path: 'workdocdetail',
        component: () => import('../views/workorder/work-doc-detail'),
        meta: { title: '工单详情', icon: 'iconfont icon-renyuanguanli',id:415 },
        hidden:true,
      },
      {
        path: 'worknodedetail',
        component: () => import('../views/workorder/work-node-detail'),
        meta: { title: '审批批注', icon: 'iconfont icon-renyuanguanli',id:428 },
        hidden:true,
      },
    ]
  },


  {
    path: '/pdfPreview',
    component: () => import('../views/pdf/pdf-preview'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/401'),
    hidden: true
  },



  {
    path: '/personal',
    component: Layout,
    redirect: '/personal',
    meta: { title: '个人中心', icon: 'example',id:405 },
    hidden:true,
    children: [
      {
        path: 'personalCenter',
        component: () => import('@/views/user/personal-center'),
        meta: { title: '个人中心', icon: 'iconfont icon-renyuanguanli',id:407 },
      },
    ]
  },
]



const createRouter = () => new Router({
  // mode: 'history', // require service support
  //base: '/electronic/',
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
