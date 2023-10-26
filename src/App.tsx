import { ConfigProvider, Spin } from "antd"
import zhCN from "antd/locale/zh_CN"
import { Suspense, ReactNode } from "react"
import { useSelector } from "react-redux"
import AuthRouter from "./router/authRouter"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from "./router/index"

function App() {
  const { colorPrimary } = useSelector((state: RootState) => state.theme)

  // 处理routers
  const RouteAuthFun = (routes: any) => {
    return routes.map(
      (item: {
        path: string
        auth: boolean
        element: ReactNode
        children?: any
      }) => {
        console.log(item);
        
        return (
          <Route
            path={item.path}
            element={
              <AuthRouter path={item.path} key={item.path}>
                {item.element}
              </AuthRouter>
            }
            key={item.path}
          >
            {/* 递归调用，因为可能存在多级的路由 */}
            {item?.children && RouteAuthFun(item.children)}
          </Route>
        )
      }
    )
  }

  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary } }}>
        <Suspense fallback={<Spin size="large" className="globa_spin" />}>
          <Routes>{RouteAuthFun(routes)}</Routes>
        </Suspense>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
