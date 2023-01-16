interface State {
  name: string;
  id: number
}

const state = () => {
  return {
    name: "",
    id: 0
  }
}

const getters = {
  getProperty(state: State) {
    return {
      id: state.id,
      name: state.name
    }
  }
}

const mutations = {
  setUser(state: State, payload: State) {
    state.name = payload.name
    state.id = payload.id
  }
}

const user = {
  namespaced: true, // 忘れずに
  state,
  getters,
  mutations
}

export default user