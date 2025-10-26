<template>
  <v-dialog v-model="dialogModel" max-width="400px">
    <v-card rounded="lg">
      <v-card-title class="pa-6 pb-4">
        <span class="text-h6 font-weight-bold">Confirmar Eliminación</span>
      </v-card-title>
      <v-card-text class="pa-6">
        {{ message }}
      </v-card-text>
      <v-card-actions class="pa-6 pt-0">
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="handleCancel">Cancelar</v-btn>
        <v-btn color="error" @click="handleConfirm" :loading="loading">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'DeleteConfirmDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      default: '¿Estás seguro de que deseas eliminar este elemento?',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'confirm', 'cancel'],
  setup(props, { emit }) {
    const dialogModel = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const handleConfirm = () => {
      emit('confirm');
    };

    const handleCancel = () => {
      emit('cancel');
    };

    return {
      dialogModel,
      handleConfirm,
      handleCancel,
    };
  },
});
</script>

