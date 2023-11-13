import store from ".."
import { getRouters } from "@/api/menu"
import { constantRoutes, dynamicRoutes } from "@/router"
import Layout from "@/layout"
import ParentView from "@/components/ParentView"
import InnerLink from "@/components/InnerLink"
import { RouteObject } from "react-router-dom"
import { lazy } from "react"

export default {
  generateRoutes(routes?: RouteObject[]) {
    return new Promise((resolve) => {
      getRouters().then((res) => {
        const sdata = JSON.parse(JSON.stringify(res.data))
        const rdata = JSON.parse(JSON.stringify(res.data))
        const defaultData = JSON.parse(JSON.stringify(res.data))
        const sidebarRoutes = filterAsyncRouter(sdata)
        const rewriteRoutes = filterAsyncRouter(rdata, false, true)
        const defaultRoutes = filterAsyncRouter(defaultData)
        // const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
        // asyncRoutes.forEach(route => {
        //     router.addRoute(route);
        // });
        store.dispatch({ type: "SET_ROUTES", payload: rewriteRoutes })
        store.dispatch({
          type: "SET_SIDE_BAR_ROUTES",
          payload: constantRoutes.concat(sidebarRoutes)
        })
        store.dispatch({ type: "SET_DEFAULT_ROUTES", payload: sidebarRoutes })
        store.dispatch({ type: "SET_TOP_BAR_ROUTES", payload: defaultRoutes })
        resolve(rewriteRoutes)
      })
    })
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(
  asyncRouterMap: any[],
  lastRouter = false,
  type = false
) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === "Layout") {
        route.element = <Layout />
      } else if (route.component === "ParentView") {
        route.element = <ParentView />
      } else if (route.component === "InnerLink") {
        route.element = <InnerLink />
      } else {
        const View = loadView(route.component)
        route.element = <View />
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route["children"]
      delete route["redirect"]
    }
    return true
  })
}

function filterChildren(childrenMap: any[], lastRouter: any = false) {
  let children: any[] = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === "ParentView" && !lastRouter) {
        el.children.forEach((c: any) => {
          c.path = el.path + "/" + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + "/" + el.path
    }
    children = children.concat(el)
  })
  return children
}

// 动态路由遍历，验证是否具备权限
// export function filterDynamicRoutes(routes: any[]) {
//     const res: any[] = [];
//     routes.forEach(route => {
//         if (route.permissions) {
//             if (auth.hasPermiOr(route.permissions)) {
//                 res.push(route);
//             }
//         } else if (route.roles) {
//             if (auth.hasRoleOr(route.roles)) {
//                 res.push(route);
//             }
//         }
//     });
//     return res;
// }

// 加载视图
export const loadView = (view: any) => {
  // 匹配pages里面所有的.tsx文件
  const modules = import.meta.glob("./../../pages/**/*.tsx")
  let res: any = () => <></>
  for (const path in modules) {
    const dir = path.split("pages/")[1].split(".tsx")[0]
    if (dir === view) {
      res = lazy(() => modules[path]() as any)
    }
  }
  return res
}
