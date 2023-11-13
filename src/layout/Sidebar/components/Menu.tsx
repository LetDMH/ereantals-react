import { Menu as AMenu } from "antd"
import type { MenuProps } from "antd"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import SvgIcon from "@/components/SvgIcon"
import { useNavigate } from "react-router-dom"

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

// 获取菜单项
function getMenuItems(routes: any) {
  if (!routes.length) return []
  const items: MenuItem[] = []
  for (let i = 0; i < routes.length; i++) {
    const item = routes[i]
    // 不隐藏
    if (!item.hidden) {
      let menuItem: MenuItem | undefined
      if (
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || !onlyOneChild.children.length) &&
        !item.alwaysShow
      ) {
        menuItem = getItem(
          onlyOneChild.meta?.title,
          onlyOneChild.path,
          !!onlyOneChild.meta?.icon && onlyOneChild.meta?.icon !== "#" && (
            <SvgIcon name={onlyOneChild.meta.icon} />
          )
        )
      } else {
        menuItem = getItem(
          item.meta?.title,
          item.path,
          item.meta?.icon && item.meta?.icon !== "#" && (
            <SvgIcon name={item.meta.icon} />
          ),
          getMenuItems(item.children)
        )
      }
      items.push(menuItem)
    }
  }
  return items
}

let onlyOneChild: IRoute = {}

function hasOneShowingChild(children: any[] = [], parent: any) {
  if (!children) {
    children = []
  }
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    // onlyOneChild = { ...parent, path: "" }
    onlyOneChild = { ...parent }
    return true
  }

  return false
}

const Menu: React.FC<{
  collapsed: boolean
}> = ({ collapsed }) => {
  const { sidebarRoutes } = useSelector((state: RootState) => state.permission)

  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    console.log(getMenuItems(sidebarRoutes))

    setMenuItems(getMenuItems(sidebarRoutes))
  }, [sidebarRoutes])

  const menuClick = ({ key, keyPath }) => {
    console.log(key, keyPath)
    const path = keyPath.reverse().join("/")
    navigate(path)
  }

  return (
    <div className="sidebar-menu">
      <AMenu
        style={{
          background: "#243D69"
        }}
        theme="dark"
        mode="inline"
        items={menuItems}
        inlineCollapsed={collapsed}
        onClick={menuClick}
      />
    </div>
  )
}

export default Menu
