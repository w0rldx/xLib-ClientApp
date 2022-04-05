import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';

function UserMenu() {
    const menu = (
        <Menu>
            <Menu.Item>
                <a href={'login'}>Login</a>
            </Menu.Item>
            <Menu.Item>
                <a href={'logout'}>Logout</a>
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
            <UserOutlined style={{ color: '#08c', fontSize: '22px' }} />
        </Dropdown>
    );
}

export default UserMenu;
