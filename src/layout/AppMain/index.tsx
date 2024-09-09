import { Outlet } from "react-router-dom"
import "./index.less"
import { useSelector } from "react-redux"

const AppMain: React.FC = () => {
  const { breadcrumbList } = useSelector((state: RootState) => state.breadcrumb)

  return (
    <div
      className="app-main"
      style={{ paddingTop: breadcrumbList.length > 2 ? "100px" : "70px" }}
    >
      {/* app-main */}
      <Outlet />
    </div>
  )
}

export default AppMain
