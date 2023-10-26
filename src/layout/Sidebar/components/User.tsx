import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { useSelector } from 'react-redux'


const User: React.FC<{
    collapsed: boolean
}> = () => {
    const { userInfo } = useSelector((state: RootState) => state.user)

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
      ];

    return (
        <div className="sidebar-user">
            <Dropdown menu={{ items }} placement="bottomLeft" arrow={{ pointAtCenter: true }}>

            </Dropdown>
        </div>
    )
}

export default User