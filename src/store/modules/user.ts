import { ActionContext } from 'vuex'
import { RootState } from '../index'
export type UserState = {
  user: string
}
const state: UserState = {
  user: ''
}

const mutations = {}

const actions = {
  // /**
  //  * 用户登录
  //  * @param commit
  //  * @param dispatch
  //  * @param {*} data
  //  */
  // loginAction({ commit }: ActionContext<UserState, RootState>, data) {
  //   return new Promise((resolve, reject) => {
  //     userAPI
  //       .login({
  //         ...data,
  //         // eslint-disable-next-line @typescript-eslint/camelcase
  //         grant_type: 'password',
  //         scope: 'server'
  //       })
  //       .then((res: any) => {
  //         res.timeStamp = new Date().getTime()
  //         commit('persistence/SET_APP_TOKEN', res, { root: true })
  //         resolve(res)
  //       })
  //       .catch((err) => {
  //         reject(err)
  //       })
  //   })
  // },
  // /**
  //  * 安全退出
  //  * @param commit
  //  * @param dispatch
  //  * @param {*} data
  //  */
  // loginOffAction({ commit }: ActionContext<UserState, RootState>, data) {
  //   return new Promise((resolve, reject) => {
  //     userAPI
  //       .logout()
  //       .then((res) => {
  //         commit('persistence/SET_APP_TOKEN', {}, { root: true })
  //         commit('user/SET_USER_INFO', {}, { root: true })
  //         commit('user/SET_LOGIN', 0, { root: true })
  //         commit('user/SET_USER_PRIVACY_INFO', {}, { root: true })
  //         resolve(res)
  //       })
  //       .catch((err) => {
  //         reject(err)
  //       })
  //   })
  // },
}
const user = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default user
