const state = {
   user: {}
}

const mutations = {
   setUser(state, doc) {
      state.user = doc
   },

   clearUser(state) {
      state.user = {}
   }
}

const getters = {
   user: (state) => {
      return state.user
   },

   loggedIn: (state) => {
      return Object.keys(state.user).length > 0 ? true : false
   }
}

const actions = {}

export default {
   namespaced: true,
   getters,
   mutations,
   actions,
   state,
}
