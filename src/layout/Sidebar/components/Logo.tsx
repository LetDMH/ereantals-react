import logo from "@/assets/images/logo.png"
import logoMini from "@/assets/images/logo_E.png"
import { useNavigate } from 'react-router-dom'

const Logo: React.FC<{
  collapsed: boolean
}> = ({ collapsed }) => {
  const navigate = useNavigate()

  return (
    <div className="sidebar-logo" onClick={() => navigate('/')}>
      <img className="sidebar-logo__img" src={collapsed ? logoMini : logo} />
    </div>
  )
}

export default Logo
