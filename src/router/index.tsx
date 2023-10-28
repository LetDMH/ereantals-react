import { createBrowserRouter, RouteObject } from "react-router-dom"
import { lazy } from "react"

const Layout = lazy(() => import("@/layout"))
const Login = lazy(() => import("@/pages/login"))

export const constantRoutes = [
  { path: "/", auth: true, element: <Layout />, children: [] },
  { path: "/login", element: <Login />, children: [] },
  { path: "*", element: <>404</>, children: [] }
]

// export default createBrowserRouter(routes)
