<template>
  <v-container fluid class="pa-8">
    <!-- Header -->
    <v-row class="mb-6">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold mb-2">Movimientos</h1>
        <p class="text-body-1 text-grey-darken-1">
          Gestiona las entradas y salidas de tu negocio
        </p>
      </v-col>
      <v-col cols="12" md="4" class="d-flex align-center justify-end">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              color="black"
              size="large"
              v-bind="props"
              prepend-icon="mdi-plus"
            >
              Nuevo Movimiento
              <v-icon end>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              prepend-icon="mdi-plus-circle"
              @click="openCreateDialog('entrada')"
            >
              <v-list-item-title class="text-success font-weight-medium">
                Agregar Entrada
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              prepend-icon="mdi-minus-circle"
              @click="openCreateDialog('salida')"
            >
              <v-list-item-title class="text-error font-weight-medium">
                Agregar Salida
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <!-- Tabla de Movimientos -->
    <MovimientosTable
      :movimientos="movimientos"
      :productos="productos"
      :loading="loading"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <!-- Dialog Crear/Editar -->
    <MovimientoFormDialog
      v-model="dialog"
      :edit-mode="editMode"
      :initial-data="formData"
      :productos="productos"
      :loading="loading"
      @save="handleSave"
      @cancel="handleCancel"
    />

    <!-- Dialog Confirmar Eliminación -->
    <DeleteConfirmDialog
      v-model="deleteDialog"
      message="¿Estás seguro de que deseas eliminar este movimiento?"
      :loading="loading"
      @confirm="handleConfirmDelete"
      @cancel="deleteDialog = false"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Movimiento, MovimientoCreate } from '@/types/movimiento.types';
import apiService from '@/services/api';
import MovimientosTable from '@/components/MovimientosTable.vue';
import MovimientoFormDialog from '@/components/MovimientoFormDialog.vue';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog.vue';

export default defineComponent({
  name: 'MovimientosView',
  components: {
    MovimientosTable,
    MovimientoFormDialog,
    DeleteConfirmDialog,
  },
  setup() {
    const store = useStore();
    
    const dialog = ref(false);
    const deleteDialog = ref(false);
    const editMode = ref(false);
    const selectedMovimiento = ref<Movimiento | null>(null);
    
    const user = computed(() => store.getters['auth/user']);
    const movimientos = computed(() => store.getters['movimientos/movimientos']);
    const loading = computed(() => store.getters['movimientos/loading']);
    const productos = ref<any[]>([]);
    
    const formData = ref<MovimientoCreate>({
      negocio_id: 1,
      tipo: 'entrada',
      producto_id: null,
      descripcion_producto: '',
      cantidad: 1,
      monto_unitario: 0,
      total: 0,
      fecha: new Date().toISOString().split('T')[0],
      observaciones: '',
    });

    const formatDateTimeLocal = (date: string) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const loadProductos = async () => {
      try {
        const data: any = await apiService.getProductos();
        productos.value = data;
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    const loadData = async () => {
      try {
        const currentUser = store.getters['auth/user'];
        const negocioId = currentUser?.negocio_id || 1;
        await Promise.all([
          store.dispatch('movimientos/fetchMovimientosByNegocio', negocioId),
          loadProductos(),
        ]);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    const openCreateDialog = (tipo: 'entrada' | 'salida') => {
      editMode.value = false;
      const negocioId = user.value?.negocio_id || 1;
      const now = formatDateTimeLocal(new Date().toISOString());
      formData.value = {
        negocio_id: negocioId,
        tipo: tipo,
        producto_id: null,
        descripcion_producto: '',
        cantidad: 1,
        monto_unitario: 0,
        total: 0,
        fecha: now,
        observaciones: '',
      };
      dialog.value = true;
    };

    const handleEdit = (movimiento: any) => {
      editMode.value = true;
      selectedMovimiento.value = movimiento;
      formData.value = {
        negocio_id: movimiento.negocio_id,
        tipo: movimiento.tipo,
        producto_id: movimiento.producto_id,
        descripcion_producto: movimiento.descripcion_producto || '',
        cantidad: typeof movimiento.cantidad === 'string' ? parseFloat(movimiento.cantidad) : movimiento.cantidad,
        monto_unitario: typeof movimiento.monto_unitario === 'string' ? parseFloat(movimiento.monto_unitario) : movimiento.monto_unitario,
        total: typeof movimiento.total === 'string' ? parseFloat(movimiento.total) : movimiento.total,
        fecha: formatDateTimeLocal(movimiento.fecha),
        observaciones: movimiento.observaciones || '',
      };
      dialog.value = true;
    };

    const handleDelete = (movimiento: any) => {
      selectedMovimiento.value = movimiento;
      deleteDialog.value = true;
    };

    const handleSave = async (data: MovimientoCreate | MovimientoCreate[]) => {
      try {
        // Si es un array, registrar múltiples movimientos
        if (Array.isArray(data)) {
          // Registrar cada movimiento en el array
          for (const movimiento of data) {
            await store.dispatch('movimientos/createMovimiento', movimiento);
          }
        } else if (editMode.value && selectedMovimiento.value) {
          // Modo edición (un solo movimiento)
          await store.dispatch('movimientos/updateMovimiento', {
            id: selectedMovimiento.value.id,
            data: data,
          });
        } else {
          // Crear un solo movimiento
          await store.dispatch('movimientos/createMovimiento', data);
        }
        dialog.value = false;
        editMode.value = false;
        selectedMovimiento.value = null;
        await loadData();
      } catch (error) {
        console.error('Error al guardar movimiento:', error);
      }
    };

    const handleCancel = () => {
      dialog.value = false;
      editMode.value = false;
      selectedMovimiento.value = null;
    };

    const handleConfirmDelete = async () => {
      if (!selectedMovimiento.value) return;

      try {
        await store.dispatch('movimientos/deleteMovimiento', selectedMovimiento.value.id);
        deleteDialog.value = false;
        selectedMovimiento.value = null;
        await loadData();
      } catch (error) {
        console.error('Error al eliminar movimiento:', error);
      }
    };

    onMounted(() => {
      loadData();
    });

    return {
      dialog,
      deleteDialog,
      editMode,
      formData,
      movimientos,
      loading,
      productos,
      openCreateDialog,
      handleEdit,
      handleDelete,
      handleSave,
      handleCancel,
      handleConfirmDelete,
    };
  },
});
</script>
