import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      account: null
    },
    getters: {
      isAuthenticated (state) {
        return !!state.user
      }
    },
    actions: {
      resetUser ({
        state
      }) {
        state.user = null
      }
    },
    mutations: {
      setUser (state, user) {
        state.user = user
      }
    }
  })
}

export default createStore
