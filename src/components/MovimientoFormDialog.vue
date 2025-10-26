<template>
  <v-dialog v-model="dialogModel" max-width="900px" persistent scrollable>
    <v-card rounded="lg" class="factura-card">
      <!-- Encabezado estilo factura -->
      <div class="factura-header" :class="cabeceraData.tipo === 'entrada' ? 'header-entrada' : 'header-salida'">
        <v-row class="pa-4" align="center">
          <v-col cols="12" md="6">
            <div class="d-flex align-center">
              <v-icon 
                :color="cabeceraData.tipo === 'entrada' ? 'success' : 'error'" 
                size="40" 
                class="mr-3"
              >
                {{ cabeceraData.tipo === 'entrada' ? 'mdi-arrow-down-circle' : 'mdi-arrow-up-circle' }}
              </v-icon>
              <div>
                <h2 class="text-h5 font-weight-bold mb-0">
                  {{ cabeceraData.tipo === 'entrada' ? 'ENTRADA' : 'SALIDA' }}
                </h2>
                <p class="text-caption text-grey-darken-1 mb-0">
                  {{ cabeceraData.tipo === 'entrada' ? 'Ingreso de dinero' : 'Egreso de dinero' }}
                </p>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="cabeceraData.fecha"
              type="date"
              variant="outlined"
              density="compact"
              label="Fecha"
              prepend-inner-icon="mdi-calendar"
              :rules="[v => !!v || 'Requerido']"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <v-divider></v-divider>

      <v-card-text class="pa-6">
        <v-form ref="form" v-model="valid">
          <!-- Formulario para agregar ítem -->
          <v-card variant="outlined" class="mb-4 pa-4">
            <h3 class="text-subtitle-2 font-weight-bold mb-3 text-grey-darken-2">
              <v-icon size="18" class="mr-1">mdi-plus-circle</v-icon>
              Agregar Ítem
            </h3>
            
            <!-- Primera Fila: Descripción/Producto y Botones de Productos -->
            <v-row dense align="center">
              <!-- Producto o Descripción -->
              <v-col cols="12" md="8">
                <v-text-field
                  v-if="!mostrarProductos"
                  v-model="itemActual.descripcion_producto"
                  label="DESCRIPCIÓN"
                  variant="outlined"
                  density="compact"
                  placeholder="Ej: Venta de producto, servicio..."
                ></v-text-field>
                <v-autocomplete
                  v-else
                  v-model="itemActual.producto_id"
                  :items="productos"
                  item-title="nombre"
                  item-value="id"
                  label="PRODUCTO"
                  variant="outlined"
                  density="compact"
                  placeholder="Buscar producto..."
                  clearable
                  :loading="!productos.length"
                  @update:model-value="onProductoSelected"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>Sin productos</v-list-item-title>
                    </v-list-item>
                  </template>
                </v-autocomplete>
              </v-col>

              <!-- Botones de Productos -->
              <v-col cols="12" md="4" class="d-flex align-center">
                <v-tooltip text="Vincular Producto Existente" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      :prepend-icon="mostrarProductos ? 'mdi-close' : 'mdi-package-variant'"
                      :color="mostrarProductos ? 'error' : 'primary'"
                      variant="tonal"
                      @click="toggleProductos"
                    >
                      {{ mostrarProductos ? 'Cancelar' : 'Producto' }}
                    </v-btn>
                  </template>
                </v-tooltip>

                <v-tooltip text="Registrar Nuevo Producto" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      prepend-icon="mdi-package-variant-plus"
                      color="info"
                      variant="tonal"
                      size="small"
                    >
                      Registrar
                    </v-btn>
                  </template>
                </v-tooltip>
              </v-col>
            </v-row>

            <!-- Segunda Fila: Cantidad, Precio, Subtotal y Botón Agregar -->
            <v-row dense class="mt-2">
              <!-- Cantidad -->
              <v-col cols="3" md="3">
                <v-text-field
                  v-model.number="itemActual.cantidad"
                  type="number"
                  variant="outlined"
                  label="Cantidad"
                  density="compact"
                  step="1"
                  min="1"
                  @input="calcularTotalItem"
                ></v-text-field>
              </v-col>

              <!-- Precio Unitario -->
              <v-col cols="3" md="3">
                <v-text-field
                  v-model.number="itemActual.monto_unitario"
                  type="number"
                  variant="outlined"
                  label="Precio Unitario"
                  density="compact"
                  prefix="S/"
                  @input="calcularTotalItem"
                ></v-text-field>
              </v-col>

              <!-- Subtotal -->
              <v-col cols="3" md="3" class="d-flex align-end">
                <v-text-field
                  :model-value="itemActual.total.toFixed(2)"
                  variant="outlined"
                  density="compact"
                  label="Subtotal"
                  prefix="S/"
                  readonly
                  bg-color="grey-lighten-4"
                ></v-text-field>
              </v-col>

              <!-- Botón Agregar Ítem -->
              <v-col cols="1" md="1" class="d-flex align-center">
                <v-btn
                  prepend-icon="mdi-plus-circle"
                  color="success"
                  @click="agregarItem"
                  :disabled="!puedeAgregarItem"
                >
                </v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Tabla de ítems agregados -->
          <v-card variant="outlined" class="mb-4">
            <v-card-title class="bg-grey-lighten-4 text-subtitle-2 font-weight-bold">
              <v-icon size="18" class="mr-1">mdi-format-list-bulleted</v-icon>
              Ítems Agregados ({{ detalles.length }})
            </v-card-title>
            <v-divider></v-divider>
            
            <v-table density="compact" v-if="detalles.length > 0">
              <thead>
                <tr class="bg-grey-lighten-5">
                  <th class="text-left">DESCRIPCIÓN</th>
                  <th class="text-center" width="80">CANT.</th>
                  <th class="text-right" width="120">P. UNIT.</th>
                  <th class="text-right" width="120">SUBTOTAL</th>
                  <th class="text-center" width="80">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in detalles" :key="index">
                  <td>{{ getDescripcionItem(item) }}</td>
                  <td class="text-center">{{ item.cantidad }}</td>
                  <td class="text-right">S/ {{ item.monto_unitario.toFixed(2) }}</td>
                  <td class="text-right font-weight-bold">S/ {{ item.total.toFixed(2) }}</td>
                  <td class="text-center">
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      color="error"
                      size="small"
                      @click="eliminarItem(index)"
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
            
            <div v-else class="text-center pa-8 text-grey">
              <v-icon size="48" color="grey-lighten-1">mdi-inbox-outline</v-icon>
              <p class="mt-2">No hay ítems agregados</p>
            </div>
          </v-card>

          <!-- Total General -->
          <v-card 
            :color="cabeceraData.tipo === 'entrada' ? 'success' : 'error'" 
            variant="flat"
            class="pa-4 text-white"
          >
            <v-row align="center">
              <v-col cols="6">
                <p class="text-h6 font-weight-bold mb-0">TOTAL {{ cabeceraData.tipo === 'entrada' ? 'INGRESO' : 'EGRESO' }}</p>
                <p class="text-caption mb-0">{{ detalles.length }} ítem(s)</p>
              </v-col>
              <v-col cols="6" class="text-right">
                <p class="text-h3 font-weight-bold mb-0">
                  S/ {{ totalGeneral.toFixed(2) }}
                </p>
              </v-col>
            </v-row>
          </v-card>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          variant="outlined"
          @click="handleCancel"
          :disabled="loading"
          size="large"
        >
          Cancelar
        </v-btn>
        <v-btn
          :color="cabeceraData.tipo === 'entrada' ? 'success' : 'error'"
          @click="handleSave"
          :loading="loading"
          :disabled="detalles.length === 0"
          size="large"
          prepend-icon="mdi-check"
        >
          Registrar {{ detalles.length }} Movimiento(s)
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType, computed } from 'vue';
import { MovimientoCreate } from '@/types/movimiento.types';

interface ItemDetalle {
  producto_id: number | null;
  descripcion_producto: string;
  cantidad: number;
  monto_unitario: number;
  total: number;
}

export default defineComponent({
  name: 'MovimientoFormDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    initialData: {
      type: Object as PropType<MovimientoCreate>,
      required: true,
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
  emits: ['update:modelValue', 'save', 'cancel'],
  setup(props, { emit }) {
    const form = ref(null);
    const valid = ref(false);
    const mostrarProductos = ref(false);
    
    // Datos de cabecera (compartidos por todos los ítems)
    const cabeceraData = ref({
      tipo: props.initialData.tipo || 'entrada',
      fecha: props.initialData.fecha || new Date().toISOString().split('T')[0],
      negocio_id: props.initialData.negocio_id || 1,
    });

    // Ítem actual que se está editando
    const itemActual = ref<ItemDetalle>({
      producto_id: null,
      descripcion_producto: '',
      cantidad: 1,
      monto_unitario: 0,
      total: 0,
    });

    // Lista de ítems agregados
    const detalles = ref<ItemDetalle[]>([]);

    const tiposMovimiento = [
      { title: 'Entrada', value: 'entrada' },
      { title: 'Salida', value: 'salida' },
    ];

    const dialogModel = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    // Calcular total general de todos los ítems
    const totalGeneral = computed(() => {
      return detalles.value.reduce((sum, item) => sum + item.total, 0);
    });

    // Validar si se puede agregar el ítem actual
    const puedeAgregarItem = computed(() => {
      const tieneDescripcion = itemActual.value.producto_id || itemActual.value.descripcion_producto.trim();
      const tieneCantidad = itemActual.value.cantidad > 0;
      const tienePrecio = itemActual.value.monto_unitario > 0;
      return tieneDescripcion && tieneCantidad && tienePrecio;
    });

    watch(() => props.initialData, (newData) => {
      cabeceraData.value = {
        tipo: newData.tipo || 'entrada',
        fecha: newData.fecha || new Date().toISOString().split('T')[0],
        negocio_id: newData.negocio_id || 1,
      };
      // Limpiar detalles al abrir
      detalles.value = [];
      resetItemActual();
    }, { deep: true });

    const calcularTotalItem = () => {
      itemActual.value.total = itemActual.value.cantidad * itemActual.value.monto_unitario;
    };

    const onProductoSelected = (value: any) => {
      if (value) {
        itemActual.value.descripcion_producto = '';
        // Buscar el producto para obtener su nombre
        const producto = props.productos.find(p => p.id === value);
        if (producto) {
          itemActual.value.descripcion_producto = producto.nombre;
        }
      }
    };

    const cerrarProductos = () => {
      mostrarProductos.value = false;
      itemActual.value.producto_id = null;
    };

    const toggleProductos = () => {
      mostrarProductos.value = !mostrarProductos.value;
      if (!mostrarProductos.value) {
        itemActual.value.producto_id = null;
      }
    };

    const resetItemActual = () => {
      itemActual.value = {
        producto_id: null,
        descripcion_producto: '',
        cantidad: 1,
        monto_unitario: 0,
        total: 0,
      };
      mostrarProductos.value = false;
    };

    const agregarItem = () => {
      if (!puedeAgregarItem.value) return;

      // Agregar el ítem a la lista
      detalles.value.push({ ...itemActual.value });
      
      // Resetear el formulario de ítem
      resetItemActual();
    };

    const eliminarItem = (index: number) => {
      detalles.value.splice(index, 1);
    };

    const getDescripcionItem = (item: ItemDetalle) => {
      if (item.producto_id) {
        const producto = props.productos.find(p => p.id === item.producto_id);
        return producto ? producto.nombre : item.descripcion_producto;
      }
      return item.descripcion_producto;
    };

    const handleSave = () => {
      if (detalles.value.length === 0) return;

      // Crear array de movimientos con los datos de cabecera + cada detalle
      const movimientos: MovimientoCreate[] = detalles.value.map(detalle => ({
        negocio_id: cabeceraData.value.negocio_id,
        tipo: cabeceraData.value.tipo,
        fecha: cabeceraData.value.fecha,
        producto_id: detalle.producto_id,
        descripcion_producto: detalle.descripcion_producto,
        cantidad: detalle.cantidad,
        monto_unitario: detalle.monto_unitario,
        total: detalle.total,
        observaciones: '',
      }));

      // Emitir el array de movimientos
      emit('save', movimientos);
    };

    const handleCancel = () => {
      detalles.value = [];
      resetItemActual();
      emit('cancel');
    };

    return {
      form,
      valid,
      mostrarProductos,
      cabeceraData,
      itemActual,
      detalles,
      tiposMovimiento,
      dialogModel,
      totalGeneral,
      puedeAgregarItem,
      calcularTotalItem,
      onProductoSelected,
      cerrarProductos,
      toggleProductos,
      agregarItem,
      eliminarItem,
      getDescripcionItem,
      handleSave,
      handleCancel,
    };
  },
});
</script>

<style scoped>
.factura-card {
  background: #ffffff;
}

.factura-header {
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
  border-bottom: 3px solid #e0e0e0;
}

.header-entrada {
  border-bottom-color: #4caf50;
}

.header-salida {
  border-bottom-color: #f44336;
}

.factura-section {
  background: #fafafa;
  padding: 14px;
  border-radius: 8px;
  border-left: 3px solid #2196f3;
  height: 100%;
}

.factura-section-calculo {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 14px;
  border-radius: 8px;
  border: 2px solid #e3f2fd;
  height: 100%;
}

.bg-grey-lighten-4 {
  background-color: #f5f5f5 !important;
}

/* Mejorar labels */
label {
  display: block;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Responsive: en móvil volver a columna única */
@media (max-width: 960px) {
  .factura-section,
  .factura-section-calculo {
    margin-bottom: 16px;
  }
}
</style>
