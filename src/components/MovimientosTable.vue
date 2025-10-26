<template>
  <v-card elevation="0" border rounded="lg">
    <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :items="movimientos"
        :loading="loading"
        :items-per-page="10"
        class="elevation-0"
      >
        <template v-slot:[`item.tipo_movimiento`]="{ item }">
          <v-chip
            :color="item.tipo_movimiento === 'entrada' ? 'success' : 'error'"
            size="small"
            variant="tonal"
          >
            {{ item.tipo_movimiento === 'entrada' ? 'Entrada' : 'Salida' }}
          </v-chip>
        </template>

        <template v-slot:[`item.fecha_hora`]="{ item }">
          {{ formatDate(item.fecha_hora) }}
        </template>

        <template v-slot:[`item.descripcion_completa`]="{ item }">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <span 
                v-bind="props" 
                class="text-truncate d-inline-block" 
                style="max-width: 250px; cursor: help;"
              >
                {{ getDescripcion(item) }}
              </span>
            </template>
            <span>{{ getDescripcion(item) }}</span>
          </v-tooltip>
        </template>

        <template v-slot:[`item.cantidad`]="{ item }">
          {{ parseInt(item.cantidad) }}
        </template>

        <template v-slot:[`item.precio_unitario`]="{ item }">
          S/ {{ formatMoney(item.precio_unitario) }}
        </template>

        <template v-slot:[`item.monto`]="{ item }">
          <span :class="item.tipo_movimiento === 'entrada' ? 'text-success' : 'text-error'" class="font-weight-bold">
            S/ {{ formatMoney(item.monto) }}
          </span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            icon
            size="small"
            variant="text"
            @click="$emit('edit', item)"
          >
            <v-icon size="20">mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            icon
            size="small"
            variant="text"
            color="error"
            @click="$emit('delete', item)"
          >
            <v-icon size="20">mdi-delete</v-icon>
          </v-btn>
        </template>

        <template v-slot:no-data>
          <div class="text-center py-8">
            <v-icon size="64" color="grey-lighten-1">mdi-swap-horizontal</v-icon>
            <p class="text-h6 text-grey-darken-1 mt-4">No hay movimientos registrados</p>
            <p class="text-body-2 text-grey">Comienza agregando tu primer movimiento</p>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Movimiento } from '@/types/movimiento.types';

export default defineComponent({
  name: 'MovimientosTable',
  props: {
    movimientos: {
      type: Array as PropType<Movimiento[]>,
      default: () => [],
    },
    productos: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['edit', 'delete'],
  setup(props) {
    const headers = [
      { title: 'Fecha', key: 'fecha_hora', sortable: true },
      { title: 'Tipo', key: 'tipo_movimiento', sortable: true },
      { title: 'Producto/Descripción', key: 'descripcion_completa', sortable: false },
      { title: 'Cantidad', key: 'cantidad', sortable: true },
      { title: 'Precio Unit.', key: 'precio_unitario', sortable: true },
      { title: 'Monto', key: 'monto', sortable: true },
      { title: 'Acciones', key: 'actions', sortable: false, align: 'center' as const },
    ];

    const parseMoneyValue = (value: any): number => {
      if (value === null || value === undefined) {
        return 0;
      }
      if (typeof value === 'number') {
        return value;
      }
      const cleanValue = String(value).replace(/[^\d.-]/g, '');
      const numValue = parseFloat(cleanValue);
      return isNaN(numValue) ? 0 : numValue;
    };

    const formatMoney = (value: any) => {
      const numValue = parseMoneyValue(value);
      return numValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    const formatDate = (date: string) => {
      const d = new Date(date);
      return d.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    };

    const getDescripcion = (movimiento: any) => {
      if (movimiento.producto_id) {
        const producto = props.productos.find(p => p.id === movimiento.producto_id);
        return producto ? producto.nombre : `Producto #${movimiento.producto_id}`;
      }
      return movimiento.descripcion || 'Sin descripción';
    };

    return {
      headers,
      formatMoney,
      formatDate,
      getDescripcion,
    };
  },
});
</script>

<style scoped>
.v-data-table {
  border-radius: 8px;
}
</style>

