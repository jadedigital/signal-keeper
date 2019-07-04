import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    getters: {
      getUserStatus: state => !!state.user,
      getUser: state => JSON.parse(state.user)
    },
    actions: {
      updateUser: ({ commit }, payload) => {
        commit('setUser', payload.currentUser)
      }
    },
    mutations: {
      setUser: (state, currentUser) => {
        if (!currentUser) {
          state.user = null
          return
        }
        let theUser = JSON.stringify(currentUser)
        state.user = theUser
      }
    }
  })
}

export default createStore
