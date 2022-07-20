import { createStore } from 'vuex'

const defaultState = {
  count: 0
}

export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    add(state: typeof defaultState) {
      state.count++
    }
  },
  actions: {
    add(context) {
      context.commit('add')
    }
  },
  getters: {
    double(state: typeof defaultState) {
      return 2 * state.count
    }
  }
})
