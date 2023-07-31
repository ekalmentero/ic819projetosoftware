import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';
import { storeToRefs } from 'pinia';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/TheHomeView.vue'),
    },
    {
      path: '/pagamento',
      name: 'pagamento',
      component: () => import('../views/ThePaymentView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/TheLoginView.vue'),
    },
    {
      path: '/agendamento',
      name: 'agendamento',
      component: () => import('../views/TheScheduleView.vue'),
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/TheProfileView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/TheAdminView.vue')
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: () => import('../views/TheReservationsView.vue')
    },
    {
      path: '/termos',
      name: 'termos',
      component: () => import('../views/TheTermosDeUso.vue')
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const user = useUserStore();
  const { isAuthenticated } = storeToRefs(user);
  
  if (to.name !== 'login') {
    user.loadToken();
    user.loadUser();
  }

  if (to.name === 'agendamento' && !isAuthenticated) {
    return next('login');
  }

  if (!isAuthenticated && to.name !== 'login' && to.name !== 'home') {
    return next('login');
  }

  if (to.name === 'admin' && !user.user.admin) {
    return next('login');
  }

  return next();
})

export default router
