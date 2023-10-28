import "./index.less"
import TagsView from "./components/TagsView"
import Breadcrumb from "./components/Breadcrumb"

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <TagsView />
      <Breadcrumb />
    </div>
  )
}

export default Navbar
