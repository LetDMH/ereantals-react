import { constantRoutes } from "@/router"
import { RouteObject } from "react-router-dom"

interface PermissionState {
  routes: RouteObject[]
  addRoutes: RouteObject[]
  defaultRoutes: RouteObject[]
  topbarRoutes: RouteObject[]
  sidebarRoutes: RouteObject[]
}

const permissionState = {
  routes: constantRoutes,
  addRoutes: [],
  defaultRoutes: [],
  topbarRoutes: [],
  sidebarRoutes: []
}

const permissionReducer = (
  state: PermissionState = permissionState,
  { type, payload }: IAction
) => {
  switch (type) {
    case "SET_ROUTES":
      constantRoutes[0].children?.push(...payload)
      return {
        ...state,
        addRoutes: payload,
        routes: constantRoutes
      }
    case "SET_DEFAULT_ROUTES":
      return { ...state, defaultRoutes: constantRoutes.concat(payload) }
    case "SET_TOP_BAR_ROUTES":
      return { ...state, topbarRoutes: payload }
    case "SET_SIDE_BAR_ROUTES":
      return { ...state, sidebarRoutes: payload }
  }
  return state
}

export default permissionReducer
