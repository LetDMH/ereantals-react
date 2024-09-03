import { Dropdown } from "antd"
import type { MenuProps } from "antd"
import { useSelector } from "react-redux"
import classNames from "classnames"
import { Link, useNavigate } from "react-router-dom"
import user from "@/store/actions/user"
import { message } from "antd"
import { memo } from "react"

const User = memo<{
  collapsed: boolean
}>(({ collapsed }) => {
  const navigate = useNavigate()

  const { userInfo, avatar, name, roles } = useSelector(
    (state: RootState) => state.user
  )

  console.log(userInfo)

  // 退出登录
  const logOut = () => {
    user.logOut().then(() => {
      message.success("退出登录成功")
      navigate("/login", { replace: true })
    })
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/user/profile">个人中心</Link>
    },
    {
      key: "2",
      type: "divider"
    },
    {
      key: "3",
      label: <span onClick={logOut}>退出登录</span>
    }
  ]

  return (
    <div className="sidebar-user">
      <Dropdown
        overlayStyle={{
          minWidth: "auto"
        }}
        menu={{ items }}
        placement="top"
        arrow={{ pointAtCenter: true }}
      >
        <div className="sidebar-user__trigger">
          <img
            className={classNames("sidebar-user__avatar", {
              "is-collapsed": collapsed
            })}
            src={avatar}
          />
          <div className={classNames({ hidden: collapsed })}>
            <div className="sidebar-user__name">{name}</div>
            <div className="sidebar-user__department">{roles[0]?.roleName}</div>
          </div>
        </div>
      </Dropdown>
    </div>
  )
})

export default User
