import { Menu } from "antd"
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import "./index.less"
import Logo from "./components/Logo"
import User from "./components/User"
import { useState, useMemo } from "react"
import { useSelector } from "react-redux"

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuItem[] = [
  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Option 1", "1"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4")
  ]),

  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8")
    ])
  ]),

  getItem("Navigation Three", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12")
  ])
]

const getMenuItem = (routes: any) => {

}

const Sidebar: React.FC = () => {
  const { sidebar } = useSelector((state: RootState) => state.app)
  const { sidebarRoutes } = useSelector((state: RootState) => state.permission)

  const collapsed = useMemo(() => {
    return !sidebar.opened
  }, [sidebar.opened])

  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed)
  // }

  return (
    <div className="sidebar-container">
      <Logo collapsed={collapsed} />
      <Menu
        style={{
          height: "calc(100% - 132px)",
          background: "#243D69"
        }}
        theme="dark"
        mode="inline"
        items={items}
        inlineCollapsed={collapsed}
      />
      <User collapsed={collapsed} />
    </div>
  )
}

export default Sidebar
