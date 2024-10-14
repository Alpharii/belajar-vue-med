import { useAuthenticated } from '@/modules/auth/composables/use-authenticated'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export default function (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const { isLogin } = useAuthenticated()
  if (!isLogin && to.name !== 'login') {
    return next('/login')
  } else if (!isLogin && to.path !== '/login' && from.path !== '/login') {
    return next('/login')
  } else if (isLogin && to.path === '/') {
    return next('/home')
  } else if (isLogin && to.path === '/login') {
    return next('/home')
  } else {
    next()
  }
}
