<template>
  <v-app>
    <template v-if="isAuthenticated">
      <!-- AppBar -->
      <v-app-bar
        elevation="0"
        color="white"
        height="70"
        border="b"
      >
        <v-container fluid class="d-flex align-center px-6">
          <v-app-bar-title class="text-h5 font-weight-bold">
            FlowNet
          </v-app-bar-title>
          
          <v-spacer></v-spacer>
          
          <v-btn
            icon
            variant="text"
            size="small"
          >
            <v-icon>mdi-bell-outline</v-icon>
          </v-btn>
          
          <v-btn
            icon
            variant="text"
            size="small"
          >
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
          
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-avatar
                color="black"
                size="40"
                class="ml-3"
                style="cursor: pointer;"
                v-bind="props"
              >
                <span class="text-white text-body-1">{{ userInitial }}</span>
              </v-avatar>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>{{ userEmail }}</v-list-item-title>
                <v-list-item-subtitle>{{ userRole }}</v-list-item-subtitle>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="handleLogout">
                <v-list-item-title>
                  <v-icon start size="small">mdi-logout</v-icon>
                  Cerrar sesión
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-container>
      </v-app-bar>

      <!-- Navigation Bar -->
      <v-navigation-drawer
        permanent
        width="280"
        color="white"
        border="e"
      >
        <v-list density="compact" nav class="pa-4">
          <!-- Dashboard -->
          <v-list-item
            prepend-icon="mdi-view-dashboard-outline"
            title="Dashboard"
            value="dashboard"
            to="/"
            class="mb-2"
            rounded="lg"
          ></v-list-item>

          <v-divider class="my-4"></v-divider>

          <!-- MÓDULO NEGOCIO -->
          <v-list-subheader class="text-caption text-grey-darken-1 font-weight-bold mb-2">
            NEGOCIO
          </v-list-subheader>

          <v-list-item
            prepend-icon="mdi-package-variant-closed"
            title="Productos"
            value="negocio-productos"
            class="mb-2"
            rounded="lg"
          ></v-list-item>

        <v-list-item
          prepend-icon="mdi-swap-horizontal"
          title="Movimientos"
          value="negocio-movimientos"
          to="/movimientos"
          class="mb-2"
          rounded="lg"
        ></v-list-item>

          <v-list-item
            prepend-icon="mdi-chart-bar"
            title="Reportes"
            value="negocio-reportes"
            class="mb-2"
            rounded="lg"
          ></v-list-item>

          <v-divider class="my-4"></v-divider>

          <!-- MÓDULO PERSONAL -->
          <v-list-subheader class="text-caption text-grey-darken-1 font-weight-bold mb-2">
            PERSONAL
          </v-list-subheader>

          <v-list-item
            prepend-icon="mdi-cash-minus"
            title="Gastos"
            value="personal-gastos"
            class="mb-2"
            rounded="lg"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi-cash-plus"
            title="Ingresos"
            value="personal-ingresos"
            class="mb-2"
            rounded="lg"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi-chart-timeline-variant"
            title="Proyecciones"
            value="personal-proyecciones"
            class="mb-2"
            rounded="lg"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi-chart-line"
            title="Reportes"
            value="personal-reportes"
            class="mb-2"
            rounded="lg"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Contenido Principal -->
      <v-main style="background-color: #FAFAFA;">
        <router-view />
      </v-main>
    </template>

    <!-- Vista sin layout (para login) -->
    <template v-else>
      <router-view />
    </template>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const router = useRouter();

    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
    const user = computed(() => store.getters['auth/user']);

    const userInitial = computed(() => {
      if (user.value?.name) {
        return user.value.name.charAt(0).toUpperCase();
      }
      if (user.value?.email) {
        return user.value.email.charAt(0).toUpperCase();
      }
      return 'U';
    });

    const userEmail = computed(() => user.value?.email || 'Usuario');
    const userRole = computed(() => user.value?.role || 'Usuario');

    const handleLogout = async () => {
      await store.dispatch('auth/logout');
      router.push('/login');
    };

    onMounted(() => {
      // Verificar autenticación al montar el componente
      store.dispatch('auth/checkAuth');
    });

    return {
      isAuthenticated,
      userInitial,
      userEmail,
      userRole,
      handleLogout,
    };
  },
});
</script>

<style>
#app {
  font-family: 'Inter', 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.v-list-item--active {
  background-color: #000000 !important;
  color: white !important;
}

.v-list-item--active .v-icon {
  color: white !important;
}

.v-list-item:hover {
  background-color: #F5F5F5 !important;
}
</style>
