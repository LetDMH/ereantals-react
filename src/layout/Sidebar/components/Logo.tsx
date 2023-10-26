import logo from "@/assets/images/logo.png"
import logoMini from "@/assets/images/logo_E.png"

const Logo: React.FC<{
  collapsed: boolean
}> = (props) => {
  const { collapsed } = props

  console.log(collapsed)

  return (
    <div className="sidebar-logo">
      <img className="sidebar-logo__img" src={collapsed ? logoMini : logo} />
    </div>
  )
}

export default Logo
