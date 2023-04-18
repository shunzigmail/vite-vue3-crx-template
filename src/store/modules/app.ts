import { ActionContext, Module } from 'vuex'
import { RootState } from '../index'
export type AppState = {
  appName: string
}
const state: AppState = {
  appName: ''
}
const mutations = {
  SET_APP_NAME: (state, data) => {
    state.appName = data
  }
}
const actions = {
  appAction({ commit }) {
    return new Promise<void>((resolve, reject) => {
      commit('SET_APP_NAME', 'test')
      resolve()
    })
  }
}
const app = {
  namespaced: true,
  state,
  mutations,
  actions
}
export default app
