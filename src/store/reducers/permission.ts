import { constantRoutes } from "@/router"
import { RouteObject } from 'react-router-dom'

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
      state.addRoutes = payload
      state.routes = constantRoutes.concat(payload)
      break
    case "SET_DEFAULT_ROUTES":
      state.defaultRoutes = constantRoutes.concat(payload)
      break
    case "SET_TOP_BAR_ROUTES":
      state.topbarRoutes = payload
      break
    case "SET_SIDE_BAR_ROUTES":
      state.sidebarRoutes = payload
      break
  }
  return state
}

export default permissionReducer
