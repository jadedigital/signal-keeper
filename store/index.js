import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: window.localStorage.getItem('user')
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
          window.localStorage.removeItem('user')
          return
        }
        let theUser = JSON.stringify(currentUser)
        state.user = theUser
        window.localStorage.setItem('user', theUser)
      }
    }
  })
}

export default createStore
