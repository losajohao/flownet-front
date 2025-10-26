import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MovimientosView from "../views/MovimientosView.vue";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/movimientos",
    name: "movimientos",
    component: MovimientosView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  // Permitir acceso al login siempre
  if (to.name === 'login') {
    next();
    return;
  }

  // Para cualquier otra ruta, verificar autenticación
  if (!isAuthenticated) {
    next({ name: 'login' });
    return;
  }

  next();
});

export default router;
