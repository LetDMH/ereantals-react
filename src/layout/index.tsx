import TopMenu from "./TopMenu"
import Sidebar from "./Sidebar"
import AppMain from "./AppMain"
import "./index.less"
import classNames from "classnames"
import { useSelector } from "react-redux"
import { memo, useMemo } from "react"

const Layout: React.FC = () => {
  console.log('重新渲染了？');
  
  const { sidebar } = useSelector((state: RootState) => state.app)
  
  const collapsed = useMemo(() => {
    return !sidebar.opened
  }, [sidebar.opened])

  return (
    <div className={classNames(["app-wrapper", { hideSidebar: collapsed }])}>
      <Sidebar />
      <div className="main-container">
        <TopMenu />
        <AppMain />
      </div>
    </div>
  )
}

export default Layout
