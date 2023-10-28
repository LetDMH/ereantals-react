import { createBrowserRouter, RouteObject } from "react-router-dom"
import { lazy } from "react"

const Layout = lazy(() => import("@/layout"))
const Login = lazy(() => import("@/pages/login"))

// 公共路由
export const constantRoutes: RouteObject[] = [
  { path: "/", element: <Layout /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <>404</> }
]

// 动态路由
export const dynamicRoutes: RouteObject[] = []

// export default createBrowserRouter(routes)
