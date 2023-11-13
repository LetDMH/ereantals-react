import { Outlet } from "react-router-dom"
import "./index.less"

const AppMain: React.FC = () => {

  console.log('AppMain');
  

  return (
    <div className="app-main">
      app-main
      <Outlet />
    </div>
  )
}

export default AppMain
