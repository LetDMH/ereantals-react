import "./index.less"
import TagsView from "./components/TagsView"
import Breadcrumb from "./components/Breadcrumb"
import { memo } from "react"

const Navbar: React.FC = memo(() => {
  console.log('Navbar');
  
  return (
    <div className="navbar">
      <TagsView />
      <Breadcrumb />
    </div>
  )
})

export default Navbar
