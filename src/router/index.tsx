import { lazy } from "react"
import { Navigate } from "react-router-dom"

const Layout = lazy(() => import("@/layout"))
const Login = lazy(() => import("@/pages/login"))

// 公共路由
export const constantRoutes: IRoute[] = [
  {
    path: "/",
    element: <Layout />,
    hidden: true,
    children: [{ path: "index", element: <>index</>, hidden: true }]
  },
  { path: "/login", element: <Login />, hidden: true },
  { path: "*", element: <></>, hidden: true }
]

// 动态路由
export const dynamicRoutes: IRoute[] = []

// export default createBrowserRouter(routes)
