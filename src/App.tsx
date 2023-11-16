import { ConfigProvider, Spin } from "antd"
import zhCN from "antd/locale/zh_CN"
import { Suspense } from "react"
import { useSelector } from "react-redux"
import AuthRouter from "./router/authRouter"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  const { colorPrimary } = useSelector((state: RootState) => state.theme)
  const { routes } = useSelector((state: RootState) => state.permission)

  console.log(routes)

  // 处理routers
  const RouteAuthFun = (routes: IRoute[]) => {
    return routes.map((item: IRoute, index: number) => {
      return (
        <Route
          path={item.path}
          element={
            <AuthRouter path={item?.path ?? ""} key={item.path}>
              {item.element}
            </AuthRouter>
          }
          key={item?.path ?? '' + index}
        >
          {/* 递归调用，因为可能存在多级的路由 */}
          {item?.children && RouteAuthFun(item.children)}
        </Route>
      )
    })
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
