import { createBrowserRouter, RouteObject } from "react-router-dom"
import { lazy, Suspense } from "react"
// import Loading from "@/components/Loading/index"

// const lazyLoad = (Component: any) => (
//   <Suspense fallback={<Loading />}>
//     <Component />
//   </Suspense>
// )

const Layout = lazy(() => import("@/layout"))
const Login = lazy(() => import("@/pages/login"))

export const routes = [
  { path: "/", auth: true, element: <Layout />, children: [] },
  { path: "/login", element: <Login />, children: [] },
  { path: "*", element: <>404</>, children: [] }
]

// export default createBrowserRouter(routes)
