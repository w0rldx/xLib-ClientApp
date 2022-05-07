import { AppShell } from '@mantine/core';
import React from 'react';
import { useStyles } from '../styles/SiteLayoutStyle';
import { NavBarPanel } from './NavBarPanel';
import { TopBar } from './TopBar';

type Props = {
    children?: JSX.Element | JSX.Element[];
    topBar?: React.ReactNode;
    sidePanel?: React.ReactNode;
};

function SiteLayout({ children }: Props) {
    const { classes } = useStyles();

    return (
        <AppShell
            navbar={<NavBarPanel width={250} />}
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    padding: 0,
                },
            })}
        >
            <div className={classes.container}>
                <div className={classes.topBar}>
                    <TopBar height={50} />
                </div>
                <div className={classes.content}>{children}</div>
            </div>
        </AppShell>
    );
}

export default SiteLayout;
