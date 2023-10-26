import { message } from "antd"
import { useEffect } from "react"
// import { useSelector } from "react-redux"
import { matchRoutes, useNavigate, useLocation } from "react-router-dom"
import { routes } from "./index"
import { getToken } from "../utils"

interface IProps {
  path: string
  children: any
}

const whiteList = ["/login", "/register", "/forget"]

const AuthRouter = ({ path, children }: IProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const token = getToken()
  const mathchs = matchRoutes(routes, location)

  const isExist = mathchs?.some((item) => item.pathname == pathname)

  useEffect(() => {
    console.log(token)
    // 没有token
    if (!token) {
      // 在免登录白名单，直接进入
      if (whiteList.includes(path)) {
        return children
      }
      // message.error("无效的会话，或者会话已过期，请重新登录。")
      navigate("/login")
    }
    // 这里判断条件是：token 存在并且是匹配到路由并且是已经登录的状态
    if (token && isExist) {
      // 如果你已经登录了，但是你通过浏览器里直接访问login的话不允许直接跳转到login路由，必须通过logout来控制退出登录或者是token过期返回登录界面
      if (["/login"].includes(path)) {
        navigate("/")
      } else {
        // 如果是其他路由就跳到其他的路由
        navigate(pathname)
      }
    }
  }, [token, pathname])

  return children
}
export default AuthRouter
