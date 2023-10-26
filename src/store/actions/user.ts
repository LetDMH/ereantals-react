import store from ".."
import { login, logout, getInfo } from "@/api/login"
import { setToken, removeToken } from "@/utils"

export default {
  // 登录
  login(userInfo: {
    username: string
    password: string
    code: string
    uuid: string
  }) {
    const username = userInfo.username.trim()
    const password = userInfo.password
    const code = userInfo.code
    const uuid = userInfo.uuid
    return new Promise((resolve, reject) => {
      login(username, password, code, uuid)
        .then((res: any) => {
          setToken(res.data.access_token)
          store.dispatch({ type: "SET_TOKEN", payload: res.data.access_token })
          resolve(1)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 获取用户信息
  getInfo() {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((res: any) => {
          const user = res.user
          store.dispatch({ type: "SET_USER_INFO", payload: res.user })
          const avatar =
            user.avatar === "" || user.avatar == null ? "" : user.avatar
          if (res.user.roles && res.user.roles.length > 0) {
            // 验证返回的roles是否是一个非空数组
            store.dispatch({ type: "SET_ROLES", payload: res.user.roles })
            store.dispatch({
              type: "SET_PERMISSIONS",
              payload: res.permissions
            })
          } else {
            store.dispatch({ type: "SET_ROLES", payload: ["默认角色"] })
          }
          store.dispatch({ type: "SET_NAME", payload: user.realName })
          store.dispatch({ type: "SET_AVATAR", payload: avatar })
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 退出系统
  logOut() {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          store.dispatch({ type: "SET_TOKEN", payload: "" })
          store.dispatch({ type: "SET_ROLES", payload: [] })
          store.dispatch({ type: "SET_PERMISSIONS", payload: [] })
          removeToken()
          resolve(1)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
