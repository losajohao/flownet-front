<template>
  <v-app>
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
        
        <v-avatar
          color="black"
          size="40"
          class="ml-3"
        >
          <span class="text-white text-body-1">U</span>
        </v-avatar>
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
  </v-app>
</template>

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
