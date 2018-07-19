import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    userId: null,
    token: null
  },
  mutations: {
    userId(state, val) {
      state.userId = val
    },
    token(state, val) {
      state.token = val
    },
    LOGOUT(state) {
      state.userId = null;
      state.token = null
    }
  },
  actions: {
    logout(context) {
      context.commit('LOGOUT')
    }
  }
});
export default store
