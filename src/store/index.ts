import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store, Module } from 'vuex'
import getters from './getters'
import { AppState } from './modules/app'
import { UserState } from '@/store/modules/user'
import { PersisitenceState } from './modules/persistence'
import createPersistedState from 'vuex-persistedstate'
export interface RootState {
  user: UserState
  app: AppState
  persistence: PersisitenceState
}

// 引入多个模块
const moduleFiles = import.meta.glob('./modules/*.ts', { eager: true })
const modules = {}
for (const modulePath in moduleFiles) {
  const storeName = modulePath.replace(/^\.\/modules\/(\w+)\.ts$/, '$1')
  modules[storeName] = (moduleFiles[modulePath] as Module).default
}

export const key: InjectionKey<Store<RootState>> = Symbol()
const store = createStore<RootState>({
  strict: process.env.NODE_ENV !== 'production',
  mutations: {},
  actions: {},
  getters,
  modules,

  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      paths: ['persistence']
    })
  ]
})
export default store
export function useStore() {
  // return store
  return baseUseStore(key)
}
