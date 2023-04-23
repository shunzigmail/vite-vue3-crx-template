declare const __DEV__: boolean

declare module '*.vue' {
  const component: any
  export default component
}

declare global {
  type Recordable<T = any> = Record<string, T>;
  declare interface ImportMetaEnv {
    VITE_APP_SOME_KEY: string;
  }
}

export {};

