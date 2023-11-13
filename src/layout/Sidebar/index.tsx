import "./index.less"
import Logo from "./components/Logo"
import User from "./components/User"
import Menu from "./components/Menu"
import { memo, useMemo } from "react"
import { useSelector } from "react-redux"

const Sidebar: React.FC = memo(() => {
  console.log('Sidebar');
  const { sidebar } = useSelector((state: RootState) => state.app)

  const collapsed = useMemo(() => {
    return !sidebar.opened
  }, [sidebar.opened])

  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed)
  // }

  return (
    <div className="sidebar-container">
      <Logo collapsed={collapsed} />
      <Menu collapsed={collapsed} />
      <User collapsed={collapsed} />
    </div>
  )
})

export default Sidebar
