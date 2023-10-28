import { message } from "antd"
import { useEffect } from "react"
// import { useSelector } from "react-redux"
import { matchRoutes, useNavigate, useLocation } from "react-router-dom"
import { routes } from "./index"
import { getToken, setToken, isRelogin, getQueryStr } from "../utils"
import { wechatLogin } from "@/api/login"
import { useDispatch, useSelector } from "react-redux"
import user from "@/store/actions/user"

interface IProps {
  path: string
  children: unknown
}

const whiteList = ["/login", "/register", "/forget"]

const AuthRouter = ({ path, children }: IProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const token = getToken()
  const mathchs = matchRoutes(routes, location)
  const isExist = mathchs?.some((item) => item.pathname == pathname)
  const dispatch = useDispatch()
  const { roles } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    console.log(token)
    // 这里判断条件是：token 存在并且是匹配到路由并且是已经登录的状态
    if (token && isExist) {
      // 如果你已经登录了，但是你通过浏览器里直接访问login的话不允许直接跳转到login路由，必须通过logout来控制退出登录或者是token过期返回登录界面
      if (["/login"].includes(path)) {
        navigate("/")
      } else {
        // 如果是其他路由就跳到其他的路由
        if (!roles.length) {
          isRelogin.show = true
          // 判断当前用户是否已拉取完user_info信息
          user
            .getInfo()
            .then(() => {
              isRelogin.show = false
              // TODO 获取权限、配置路由
              navigate(pathname)
            })
            .catch((err) => {
              user.logOut().then(() => {
                message.error(err)
                navigate("/")
              })
            })
        } else {
          navigate(pathname)
        }
      }
    } else {
      // 没有token
      if (whiteList.indexOf(path) !== -1) {
        // 在免登录白名单，直接进入
        navigate(pathname)
      } else {
        // 企业微信登录
        if (path === "/wechatLogin") {
          const params = {
            appid: getQueryStr("appid"),
            code: getQueryStr("code"),
            platform: "pc"
          }
          wechatLogin(params)
            .then((res) => {
              setToken(res.data.access_token)
              dispatch({ type: "SET_TOKEN", payload: res.data.access_token })
              navigate("/")
            })
            .catch(() => {
              navigate("/login")
            })
        } else {
          navigate("/login") // 否则全部重定向到登录页
        }
      }
    }
  }, [token, pathname])

  return children
}
export default AuthRouter
