import { ActionIcon, Text, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { BsMoonStars, BsSun } from 'react-icons/bs';
import '../styles/TopBar.scss';

function TopBar() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <div className="nav">
            <div className="navigation">
                <Text weight={700} className="logo">
                    xLib
                </Text>
            </div>
            <div className="user-area">
                <div className="search-bar"></div>
                <div className="dark-Mode-Button">
                    <ActionIcon
                        variant="outline"
                        color={dark ? 'yellow' : 'blue'}
                        onClick={() => toggleColorScheme()}
                        title="Toggle color scheme"
                    >
                        {dark ? <BsSun size={18} /> : <BsMoonStars size={18} />}
                    </ActionIcon>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
