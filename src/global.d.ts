import store from "./store"

export {}
declare global {
  type RootState = ReturnType<typeof store.getState>
  interface Window {
    WwLogin: any
  }
  interface IAction {
    type: string,
    payload?: any
  }
}
