const router = [
  {
    name: 'index',
    path: '/',
    component: () => import('@/pages/index')
  },
  {
    path: '*',
    redirect: '/index'
  },
  {
    path: '/',
    redirect: '/index'
  }
];

export default router;
