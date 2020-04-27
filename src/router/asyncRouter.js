export const asyncRouter = [
  {
    path: '/statistics',
    component: () => import('@/layout'),
    redirect: '/statistics/index',
    meta: {title: '统计查询', icon: 'example', id: 416, admin: true},
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/statistics/index'),
        meta: {title: '统计查询', icon: 'iconfont icon-cz-tjcx', id: 417,}
      }
    ]
  }
]
