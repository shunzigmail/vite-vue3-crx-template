import { ActionContext } from 'vuex'
import { RootState } from '../index'
export type PersisitenceState = {
  theme: string
}
const state = {
  theme: 'BrightRed'
}

const mutations = {}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
