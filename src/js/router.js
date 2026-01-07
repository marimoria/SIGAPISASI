import { createRouter, createWebHashHistory } from 'vue-router';
import { user, isAdmin } from '../components/composables/useAuth';

import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    /*
    {
      path: '/meal',
      name: 'meal plan',
      component: Meal
    },
    {
      path: '/testimony',
      name: 'testimony',
      component: Testimony
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: Subscription
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactUs
    },
    {
      path: '/signup',
      name: 'sign up',
      component: SignUp,
      meta: { notAllowAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { notAllowAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true, notAllowAdmin: true }
    },
    {
      path: '/admin',
      name: 'admin dashboard',
      component: AdminDash,
      meta: { requiresAdmin: true }
    },
    */
    {
      path: '/:pathMatch(.*)*',
      component: Home
    }
  ]
});

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  const notAllowAuth = to.matched.some((record) => record.meta.notAllowAuth);
  const notAllowAdmin = to.matched.some((record) => record.meta.notAllowAdmin);

  if (notAllowAuth && user.value) {
    return '/';
  }

  if (notAllowAdmin && isAdmin.value) {
    return '/';
  }

  if (requiresAuth && !user.value) {
    return '/';
  }

  if (requiresAdmin && !isAdmin.value) {
    return '/';
  }

  return true;
});

export default router;
