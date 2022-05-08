import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { MoonStars, Sun } from 'tabler-icons-react';
import { useStyles } from '../styles/TopBarStyle';

interface TopBarProps {
    height: number;
}

export function TopBar(props: TopBarProps) {
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <div style={{ height: props.height }} className={classes.header}>
            <div className={classes.inner}>
                <Group ml={50} spacing={5}></Group>
                <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                >
                    {dark ? <Sun size={18} /> : <MoonStars size={18} />}
                </ActionIcon>
            </div>
        </div>
    );
}
