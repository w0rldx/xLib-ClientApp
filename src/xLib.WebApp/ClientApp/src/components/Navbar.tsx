import { Typography } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';
import UserMenu from './UserMenu';

const { Title } = Typography;

const defaultLinkData = [{ href: '/', label: 'Home' }];

function Navbar() {
    const links = defaultLinkData.map((link) => (
        <Link key={link.href} to={link.href}>
            {link.label}
        </Link>
    ));

    return (
        <div className="nav">
            <div className="navigation">
                <Title level={3} style={{ color: '#ffffff', marginTop: 10 }}>
                    xLib
                </Title>
                <div className="links">{links}</div>
            </div>

            <div className="userArea">
                <div className="searchBar">
                    <Search placeholder="Search" style={{ width: 200 }} />
                </div>
                <div className="user">
                    <UserMenu />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
