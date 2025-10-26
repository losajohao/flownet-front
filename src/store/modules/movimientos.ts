import { Module } from 'vuex';
import apiService from '@/services/api';
import { MovimientosState, Movimiento, MovimientoCreate, KardexResponse, SaldoResponse } from '@/types/movimiento.types';

const movimientos: Module<MovimientosState, any> = {
  namespaced: true,
  
  state: {
    movimientos: [],
    kardex: null,
    saldo: null,
    loading: false,
    error: null,
  },

  getters: {
    movimientos: (state) => state.movimientos,
    kardex: (state) => state.kardex,
    saldo: (state) => state.saldo,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },

  mutations: {
    SET_MOVIMIENTOS(state, movimientos: Movimiento[]) {
      state.movimientos = movimientos;
    },
    SET_KARDEX(state, kardex: KardexResponse) {
      state.kardex = kardex;
    },
    SET_SALDO(state, saldo: SaldoResponse) {
      state.saldo = saldo;
    },
    SET_LOADING(state, loading: boolean) {
      state.loading = loading;
    },
    SET_ERROR(state, error: string | null) {
      state.error = error;
    },
    ADD_MOVIMIENTO(state, movimiento: Movimiento) {
      state.movimientos.unshift(movimiento);
    },
    UPDATE_MOVIMIENTO(state, movimiento: Movimiento) {
      const index = state.movimientos.findIndex(m => m.id === movimiento.id);
      if (index !== -1) {
        state.movimientos.splice(index, 1, movimiento);
      }
    },
    DELETE_MOVIMIENTO(state, id: number) {
      state.movimientos = state.movimientos.filter(m => m.id !== id);
    },
  },

  actions: {
    async fetchMovimientos({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const data = await apiService.getMovimientos();
        commit('SET_MOVIMIENTOS', data);
        return data;
      } catch (error: any) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchMovimientosByNegocio({ commit }, negocioId: number) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const data = await apiService.getMovimientosByNegocio(negocioId);
        commit('SET_MOVIMIENTOS', data);
        return data;
      } catch (error: any) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchKardex({ commit }, negocioId: number) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const data = await apiService.getKardex(negocioId);
        commit('SET_KARDEX', data);
        return data;
      } catch (error: any) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchSaldo({ commit }, negocioId: number) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const data = await apiService.getSaldo(negocioId);
        commit('SET_SALDO', data);
        return data;
      } catch (error: any) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchMovimientosByTipo({ commit }, { negocioId, tipo }: { negocioId: number; tipo: 'entrada' | 'salida' }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const data = await apiService.getMovimientosByTipo(negocioId, tipo);
        commit('SET_MOVIMIENTOS', data);
        return data;
      } catch (error: any) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchMovimientosByRango({ commit }, { negocioId, fechaInicio, fechaFin }: { negocioId: number; fechaInicio: string; fechaFin: string }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const data = await apiService.getMovimientosByRango(negocioId, fechaInicio, fechaFin);
        commit('SET_MOVIMIENTOS', data);
        return data;
      } catch (error: any) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async createMovimiento({ commit }, movimiento: MovimientoCreate) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const data = await apiService.createMovimiento(movimiento);
        commit('ADD_MOVIMIENTO', data);
        return data;
      } catch (error: any) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async updateMovimiento({ commit }, { id, data }: { id: number; data: Partial<MovimientoCreate> }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const updated = await apiService.updateMovimiento(id, data);
        commit('UPDATE_MOVIMIENTO', updated);
        return updated;
      } catch (error: any) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async deleteMovimiento({ commit }, id: number) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        await apiService.deleteMovimiento(id);
        commit('DELETE_MOVIMIENTO', id);
      } catch (error: any) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },
};

export default movimientos;

