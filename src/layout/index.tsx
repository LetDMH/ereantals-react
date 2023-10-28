import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import AppMain from "./AppMain"
import "./index.less"

const Layout = () => {
  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="main-container">
        <Navbar />
        <AppMain />
      </div>
    </div>
  )
}

export default Layout
