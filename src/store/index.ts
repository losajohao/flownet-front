import { createStore } from "vuex";
import auth from "./modules/auth";
import movimientos from "./modules/movimientos";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    movimientos,
  },
});
