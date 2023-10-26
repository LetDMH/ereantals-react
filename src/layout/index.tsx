import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import AppMain from "./AppMain"

const Index = () => {
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

export default Index
