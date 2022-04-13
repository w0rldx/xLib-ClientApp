import { Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

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
                <Text weight={700} className="logo">
                    xLib
                </Text>
                <div className="links">{links}</div>
            </div>

            <div className="userArea">
                <div className="searchBar"></div>
                <div className="user"></div>
            </div>
        </div>
    );
}

export default Navbar;
