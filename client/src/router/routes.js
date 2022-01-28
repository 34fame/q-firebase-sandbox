const routes = [
   {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
         { name: 'home', path: '', component: () => import('pages/Index.vue') },
         {
            name: 'login',
            path: 'login',
            component: () => import('pages/Login.vue'),
         },
         {
            name: 'logout',
            path: 'logout',
            component: () => import('pages/Logout.vue'),
         },
         {
            name: 'products',
            path: 'products',
            component: () => import('pages/Products.vue'),
         },
      ],
   },

   {
      path: '/:catchAll(.*)*',
      component: () => import('pages/Error404.vue'),
   },
]

export default routes
