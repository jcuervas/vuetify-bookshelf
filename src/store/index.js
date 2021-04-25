import Vue from "vue";
import Vuex, { createLogger } from "vuex";
import state from "@/store/state";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [vuexLocal.plugin, createLogger()],
});
