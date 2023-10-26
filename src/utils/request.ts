import axios from "axios"
import { message, Modal, notification } from "antd"
import { getToken } from "./auth"
import { tansParams } from "./index"

const { confirm } = Modal

// 是否显示重新登录
export const isRelogin = { show: false }

const errorCode = {
  "401": "认证失败，无法访问系统资源",
  "403": "当前操作没有权限",
  "404": "访问资源不存在",
  default: "系统未知错误，请反馈给管理员"
} as Record<string, string>

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 60000 * 3,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})

instance.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken && config.headers) {
      config.headers["Authorization"] = "Bearer " + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use((res) => {
  // 文件下载
  if (res.config.responseType == "blob") {
    let blob = window.URL.createObjectURL(
      new Blob([res.data], {
        type: res.data.type
      })
    )
    let link = document.createElement("a")
    link.style.display = "none"
    link.href = blob
    link.setAttribute("download", "")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link) //下载完成移除元素
    window.URL.revokeObjectURL(blob) //释放掉 blob 对象
  }
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode["default"]
  // 二进制数据则直接返回
  if (
    res.request.responseType === "blob" ||
    res.request.responseType === "arraybuffer"
  ) {
    return res.data
  }
  if (code === 401) {
    if (!isRelogin.show) {
      ;(isRelogin.show = true),
        confirm({
          title: "系统提示",
          content: "登录状态已过期，您可以继续留在该页面，或者重新登录",
          okText: "重新登录",
          onOk() {
            isRelogin.show = false
            //       useUserStore()
            //         .logOut()
            //         .then(() => {
            //           location.href = "/index"
            //         })
          },
          onCancel() {
            isRelogin.show = false
          }
        })
    }
    return Promise.reject("无效的会话，或者会话已过期，请重新登录。")
  } else if (code === 500) {
    message.error(msg)
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    notification.error({
      message: msg
    })
    return Promise.reject("error")
  } else {
    return Promise.resolve(res.data)
  }
})

export default instance