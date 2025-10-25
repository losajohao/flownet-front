<template>
  <v-container fluid class="pa-8">
    <!-- Header Section -->
    <v-row class="mb-8">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-2">Dashboard</h1>
        <p class="text-body-1 text-grey-darken-1">
          Resumen general de negocio y finanzas personales
        </p>
      </v-col>
    </v-row>

    <!-- MÓDULO NEGOCIO -->
    <v-row class="mb-2">
      <v-col cols="12">
        <h2 class="text-h6 font-weight-bold text-grey-darken-2">Negocio</h2>
      </v-col>
    </v-row>

    <v-row class="mb-8">
      <v-col cols="12" md="4">
        <v-card
          elevation="0"
          class="pa-6"
          border
          rounded="lg"
        >
          <div class="d-flex justify-space-between align-center mb-3">
            <span class="text-body-2 text-grey-darken-1">INGRESOS</span>
            <v-icon size="20" color="black">mdi-arrow-up</v-icon>
          </div>
          <h2 class="text-h4 font-weight-bold mb-1">S/ 0.00</h2>
          <span class="text-caption text-grey">Este mes</span>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          elevation="0"
          class="pa-6"
          border
          rounded="lg"
        >
          <div class="d-flex justify-space-between align-center mb-3">
            <span class="text-body-2 text-grey-darken-1">EGRESOS</span>
            <v-icon size="20" color="black">mdi-arrow-down</v-icon>
          </div>
          <h2 class="text-h4 font-weight-bold mb-1">S/ 0.00</h2>
          <span class="text-caption text-grey">Este mes</span>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          elevation="0"
          class="pa-6"
          border
          rounded="lg"
        >
          <div class="d-flex justify-space-between align-center mb-3">
            <span class="text-body-2 text-grey-darken-1">BALANCE</span>
            <v-icon size="20" color="black">mdi-wallet-outline</v-icon>
          </div>
          <h2 class="text-h4 font-weight-bold mb-1">S/ 0.00</h2>
          <span class="text-caption text-grey">Total negocio</span>
        </v-card>
      </v-col>
    </v-row>

    <!-- MÓDULO PERSONAL -->
    <v-row class="mb-2">
      <v-col cols="12">
        <h2 class="text-h6 font-weight-bold text-grey-darken-2">Personal</h2>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col cols="12" md="4">
        <v-card
          elevation="0"
          class="pa-6"
          border
          rounded="lg"
        >
          <div class="d-flex justify-space-between align-center mb-3">
            <span class="text-body-2 text-grey-darken-1">INGRESOS</span>
            <v-icon size="20" color="black">mdi-cash-plus</v-icon>
          </div>
          <h2 class="text-h4 font-weight-bold mb-1">S/ 0.00</h2>
          <span class="text-caption text-grey">Este mes</span>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          elevation="0"
          class="pa-6"
          border
          rounded="lg"
        >
          <div class="d-flex justify-space-between align-center mb-3">
            <span class="text-body-2 text-grey-darken-1">GASTOS</span>
            <v-icon size="20" color="black">mdi-cash-minus</v-icon>
          </div>
          <h2 class="text-h4 font-weight-bold mb-1">S/ 0.00</h2>
          <span class="text-caption text-grey">Este mes</span>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          elevation="0"
          class="pa-6"
          border
          rounded="lg"
        >
          <div class="d-flex justify-space-between align-center mb-3">
            <span class="text-body-2 text-grey-darken-1">BALANCE</span>
            <v-icon size="20" color="black">mdi-wallet-outline</v-icon>
          </div>
          <h2 class="text-h4 font-weight-bold mb-1">S/ 0.00</h2>
          <span class="text-caption text-grey">Total personal</span>
        </v-card>
      </v-col>
    </v-row>

    <!-- Main Content Grid -->
    <v-row>
      <!-- Activity Section -->
      <v-col cols="12" md="8">
        <!-- Movimientos de Negocio -->
        <v-card
          elevation="0"
          border
          rounded="lg"
          class="pa-6 mb-4"
        >
          <div class="d-flex justify-space-between align-center mb-6">
            <div>
              <h3 class="text-h6 font-weight-bold">Movimientos de Negocio</h3>
              <p class="text-caption text-grey-darken-1 mt-1">Últimas transacciones comerciales</p>
            </div>
            <v-btn
              variant="text"
              size="small"
              append-icon="mdi-arrow-right"
            >
              Ver todos
            </v-btn>
          </div>

          <v-list class="pa-0">
            <v-list-item class="px-0">
              <template v-slot:prepend>
                <v-avatar
                  color="grey-lighten-3"
                  size="40"
                  class="mr-4"
                >
                  <v-icon color="grey" size="20">mdi-swap-horizontal</v-icon>
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-medium mb-1">
                Sin movimientos registrados
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                Comienza a registrar operaciones de negocio
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>

        <!-- Actividad Personal -->
        <v-card
          elevation="0"
          border
          rounded="lg"
          class="pa-6"
        >
          <div class="d-flex justify-space-between align-center mb-6">
            <div>
              <h3 class="text-h6 font-weight-bold">Actividad Personal</h3>
              <p class="text-caption text-grey-darken-1 mt-1">Gastos e ingresos personales recientes</p>
            </div>
            <v-btn
              variant="text"
              size="small"
              append-icon="mdi-arrow-right"
            >
              Ver todos
            </v-btn>
          </div>

          <v-list class="pa-0">
            <v-list-item class="px-0">
              <template v-slot:prepend>
                <v-avatar
                  color="grey-lighten-3"
                  size="40"
                  class="mr-4"
                >
                  <v-icon color="grey" size="20">mdi-cash</v-icon>
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-medium mb-1">
                Sin actividad registrada
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                Comienza a registrar tus gastos e ingresos
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Quick Actions & Summary -->
      <v-col cols="12" md="4">
        <!-- Quick Actions Negocio -->
        <v-card
          elevation="0"
          border
          rounded="lg"
          class="pa-6 mb-4"
        >
          <h3 class="text-h6 font-weight-bold mb-2">Acciones - Negocio</h3>
          <p class="text-caption text-grey-darken-1 mb-4">Operaciones comerciales</p>

          <v-btn
            block
            size="large"
            color="black"
            class="mb-3"
            prepend-icon="mdi-plus"
          >
            Nuevo Movimiento
          </v-btn>

          <v-btn
            block
            size="large"
            variant="outlined"
            color="black"
            prepend-icon="mdi-package-variant-closed"
          >
            Agregar Producto
          </v-btn>
        </v-card>

        <!-- Quick Actions Personal -->
        <v-card
          elevation="0"
          border
          rounded="lg"
          class="pa-6 mb-4"
        >
          <h3 class="text-h6 font-weight-bold mb-2">Acciones - Personal</h3>
          <p class="text-caption text-grey-darken-1 mb-4">Finanzas personales</p>

          <v-btn
            block
            size="large"
            color="black"
            class="mb-3"
            prepend-icon="mdi-cash-plus"
          >
            Registrar Ingreso
          </v-btn>

          <v-btn
            block
            size="large"
            variant="outlined"
            color="black"
            prepend-icon="mdi-cash-minus"
          >
            Registrar Gasto
          </v-btn>
        </v-card>

        <!-- Summary Card -->
        <v-card
          elevation="0"
          color="black"
          rounded="lg"
          class="pa-6"
        >
          <h3 class="text-h6 font-weight-bold mb-2 text-white">
            Resumen General
          </h3>
          <p class="text-body-2 text-grey-lighten-1 mb-6">
            Estado actual del sistema
          </p>

          <div class="mb-4">
            <p class="text-caption text-grey-lighten-1 mb-2">NEGOCIO</p>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-white text-body-2">Productos</span>
              <span class="text-white font-weight-bold">0</span>
            </div>
            <div class="d-flex justify-space-between">
              <span class="text-white text-body-2">Movimientos</span>
              <span class="text-white font-weight-bold">0</span>
            </div>
          </div>

          <v-divider class="my-4" color="grey-darken-1"></v-divider>

          <div>
            <p class="text-caption text-grey-lighten-1 mb-2">PERSONAL</p>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-white text-body-2">Transacciones</span>
              <span class="text-white font-weight-bold">0</span>
            </div>
            <div class="d-flex justify-space-between">
              <span class="text-white text-body-2">Proyecciones</span>
              <span class="text-white font-weight-bold">0</span>
            </div>
  </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
}
</style>
