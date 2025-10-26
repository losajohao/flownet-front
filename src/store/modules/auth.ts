import { Module } from 'vuex';
import apiService from '@/services/api';
import { AuthState, LoginCredentials } from '@/types/auth.types';

const auth: Module<AuthState, any> = {
  namespaced: true,
  
  state: {
    user: null,
    token: null,
    isAuthenticated: !!localStorage.getItem('user'),
    loading: false,
  },

  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
    token: (state) => state.token,
    loading: (state) => state.loading,
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(user));
    },
    SET_LOADING(state, loading: boolean) {
      state.loading = loading;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },

  actions: {
    async login({ commit }, credentials: LoginCredentials) {
      commit('SET_LOADING', true);
      
      try {
        const data = await apiService.login(credentials);
        
        if (data.user) {
          commit('SET_USER', data.user);
        } else if (data) {
          commit('SET_USER', data);
        }

        return data;
      } catch (error: any) {
        commit('LOGOUT');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async logout({ commit }) {
      commit('LOGOUT');
    },

    async checkAuth({ commit }) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          commit('SET_USER', user);
        } catch (e) {
          console.error('Error parsing user from localStorage', e);
          commit('LOGOUT');
        }
      }
    },
  },
};

export default auth;

