import "./index.less"
import TagsView from "./components/TagsView"
import Navbar from "./components/Navbar"
import { memo } from "react"

const TopMenu: React.FC = memo(() => {
  console.log('TopMenu');
  
  return (
    <div className="topMenu">
      <TagsView />
      {/* TODO 操作页面后续完善导航栏 */}
      {/* <Navbar /> */}
    </div>
  )
})

export default TopMenu
