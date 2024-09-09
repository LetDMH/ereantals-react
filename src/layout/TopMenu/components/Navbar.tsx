import { Button, Breadcrumb } from "antd";
import { LeftOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useEffect, useMemo } from "react";
import { useLocation, matchRoutes } from 'react-router-dom'

const Navbar: React.FC = () => {
    const { pathname } = useLocation()

    const { routes } = useSelector((state: RootState) => state.permission)
    const { colorPrimary } = useSelector((state: RootState) => state.theme)

    const buttonStyle = useMemo(() => {
        return {
            color: colorPrimary,
            fontSize: '16px',
            fontWeight: 'bold'
        }
    }, [colorPrimary])

    useEffect(() => {
        console.log(matchRoutes(routes, location));
    }, [pathname])

    return (
        <div className="navbar">
            <Button style={buttonStyle} type="link" icon={<LeftOutlined style={{ fontSize: '14px' }} />}>返回</Button>
            <Breadcrumb />
        </div>
    )
}

export default Navbar