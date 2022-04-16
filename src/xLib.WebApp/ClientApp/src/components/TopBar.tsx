import { Text } from '@mantine/core';
import React from 'react';
import '../styles/TopBar.scss';

function TopBar() {
    return (
        <div className="nav">
            <div className="navigation">
                <Text weight={700} className="logo">
                    xLib
                </Text>
            </div>
            <div className="userArea">
                <div className="searchBar"></div>
                <div className="user"></div>
            </div>
        </div>
    );
}

export default TopBar;
