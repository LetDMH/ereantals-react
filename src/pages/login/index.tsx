import { useEffect, useState } from "react"
import "./index.less"
import lottie from "lottie-web"
import { AnimationItem } from "lottie-web"
import animationData from "../../../public/animation/data.json"
import LoginFooter from "./loginFooter"
import { Button, Form, Input } from "antd"
import type { FormRule } from "antd"
import logo from "@/assets/images/login_logo.png"
import classNames from "classnames"
import { getCodeImg, login } from "@/api/login"
import { useDispatch } from "react-redux"
import user from "@/store/actions/user"
import useCrypto from "@/hooks/useCrypto"
import { useNavigate } from "react-router-dom"

type FieldType = {
  username?: string
  password?: string
  code?: string
}

const loginRules: Record<string, FormRule[]> = {
  username: [
    {
      required: true,
      message: "请输入您的账号",
      validateTrigger: ["onBlur", "onChange"]
    }
  ],
  password: [
    {
      required: true,
      message: "请输入您的密码",
      validateTrigger: ["onBlur", "onChange"]
    }
  ],
  code: [
    { required: true, message: "请输入验证码", validateTrigger: ["onChange"] }
  ]
}

const tabs = [
  { label: "账号登录", value: 0 },
  { label: "企业微信登录", value: 1 }
]

let captchaEnabled = true
let uuid: string

// 获取图片地址
const getAssetsImages = () => {
  if (import.meta.env.VITE_APP_ENV === "production") {
    return "/animation/images/"
  }
  return "/public/animation/images/"
}

const { encrypt } = useCrypto()

const Login: React.FC = () => {
  console.log(111)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(false)
  const [codeUrl, setCodeUrl] = useState("")

  // 登录
  const handleLogin = (values: any) => {
    setLoading(true)
    console.log("Success:", values)

    user
      .login(
        Object.assign({}, values, {
          password: encrypt(values.password),
          platform: "pc",
          uuid
        })
      )
      .then(() => {
        navigate("/")
      })
      .catch(() => {
        setLoading(false)
        // 重新获取验证码
        if (captchaEnabled) {
          getCode()
        }
      })
  }
  // 获取验证码
  const getCode = () => {
    getCodeImg().then((res: any) => {
      captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
      console.log(captchaEnabled);
      
      if (captchaEnabled) {
        setCodeUrl("data:image/gif;base64," + res.img)
        uuid = res.uuid
      }
    })
  }

  useEffect(() => {
    if (active === 1) {
      new window.WwLogin({
        id: "wx_reg",
        appid: "ww0a60c4d81bebcddf",
        agentid: "1000012",
        // "redirect_uri": "http://egs3-test.yuncanglian.com/wechatLogin",
        redirect_uri: window.location.origin + "/wechatLogin"
      })
    }
  }, [active])

  let lottieInstance: AnimationItem

  useEffect(() => {
    console.log(222)

    // 初始化lottie动画
    lottieInstance = lottie.loadAnimation({
      container: document.getElementById("lottie") as HTMLElement, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData, // animation json
      assetsPath: getAssetsImages() //
    })
    // 获取验证码
    getCode()
    return () => {
      lottieInstance.destroy()
    }
  }, [])

  return (
    <div className="login">
      <div className="login-container">
        <div id="lottie"></div>
        <Form
          className="login-form"
          name="login-form"
          initialValues={{}}
          onFinish={handleLogin}
          autoComplete="off"
          validateTrigger={["onBlur", "onChange"]}
        >
          <img src={logo} alt="E租赁" />
          <div className="login-tab">
            {tabs.map((item: any) => {
              return (
                <div
                  className={classNames("login-tab__item", {
                    "login-tab__item--active": item.value === active
                  })}
                  key={item.value}
                  onClick={() => setActive(item.value)}
                >
                  <div className="login-tab__content">{item.label}</div>
                  <div className="login-tab__line"></div>
                </div>
              )
            })}
          </div>
          {active === 0 ? (
            <>
              <Form.Item<FieldType> name="username" rules={loginRules.username}>
                <Input className="login-form__input" placeholder="账号" />
              </Form.Item>

              <Form.Item<FieldType> name="password" rules={loginRules.password}>
                <Input.Password placeholder="密码" />
              </Form.Item>
              <Form.Item<FieldType> name="code" rules={loginRules.code}>
                <div className="flex">
                  <Input
                    className="login-form__input !w-[250px]"
                    placeholder="验证码"
                  />
                  <div className="login-code">
                    <img
                      src={codeUrl}
                      className="login-code-img"
                      onClick={getCode}
                    />
                  </div>
                </div>
              </Form.Item>
              <Form.Item className="mt-[48px] mb-[12px]">
                <Button
                  className="w-[100%] h-[60px] rounded-[10px]"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  <span className="text-[20px]">
                    {loading ? "登 录 中..." : "登 录"}
                  </span>
                </Button>
              </Form.Item>
              <div className="text-right">
                <Button className="text-[#1850AE]" type="link">
                  忘记密码？
                </Button>
              </div>
            </>
          ) : (
            <div id="wx_reg"></div>
          )}
        </Form>
      </div>
      <LoginFooter />
    </div>
  )
}

export default Login
