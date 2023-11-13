import store from "./store"
import { RouteObject } from "react-router-dom"

export {}
declare global {
  interface Window {
    WwLogin: any
  }
  type RootState = ReturnType<typeof store.getState>
  interface IAction {
    type: string
    payload?: any
  }
  type IRoute = RouteObject & {
    hidden?: boolean
    meta?: Record<string, any>
  }
}
