import { createStore } from 'vuex'

interface State {
  name: string;
  id: number
}

export default createStore<State>({
  state() {
    return {
      name: "",
      id: 0
    }
  },
  getters: {
    getProperty(state) {
      return {
        id: state.id,
        name: state.name
      }
    }
  },
  mutations: {
    setUser(state, payload) {
      state.name = payload.name
      state.id = payload.id
    }
  },
  actions: {
  },
  modules: {
  }
})
