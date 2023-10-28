import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { useSelector, useDispatch } from "react-redux"

const iconStyle = {
	fontSize: "18px"
}

const TagsView: React.FC = () => {
  const { sidebar } = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()

  return (
    <div className="tagsView">
      <div
        className="tagsView__hamburger"
        onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
      >
        {sidebar.opened ? (
          <MenuFoldOutlined style={iconStyle} />
        ) : (
          <MenuUnfoldOutlined style={iconStyle} />
        )}
      </div>
    </div>
  )
}

export default TagsView
