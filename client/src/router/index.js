import { route } from 'quasar/wrappers'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const createHistory = createWebHistory

const router = createRouter({
   scrollBehavior: () => ({ left: 0, top: 0 }),
   routes,
   history: createHistory(process.env.VUE_ROUTER_BASE),
})

export default route(function ({ store }) {
   router.beforeEach((to, from, next) => {
      const publicPaths = ['home', 'login', 'logout']
      const authenticated = store.getters['app/loggedIn']

      if (publicPaths.includes(to.name)) return next()

      if (!authenticated) return next({ name: 'login' })

      next()
   })

   return router
})
