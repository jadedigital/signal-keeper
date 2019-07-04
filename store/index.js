import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: localStorage.getItem('user')
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
          localStorage.removeItem('user')
          return
        }
        let theUser = JSON.stringify(currentUser)
        state.user = theUser
        localStorage.setItem('user', theUser)
      }
    }
  })
}

export default createStore
