import { AppShell, Header, MantineProvider, Navbar } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import '../styles/SiteLayout.scss';

type Props = {
    children?: React.ReactChild | React.ReactChild[];
    topBar?: React.ReactNode;
    sidePanel?: React.ReactNode;
};

function SiteLayout({ children, topBar, sidePanel }: Props) {
    return (
        <MantineProvider>
            <NotificationsProvider>
                <AppShell
                    padding="md"
                    navbar={<Navbar className="sidePanel">{sidePanel}</Navbar>}
                    header={
                        <Header className="navbar" height={64}>
                            {topBar}
                        </Header>
                    }
                >
                    {children}
                </AppShell>
            </NotificationsProvider>
        </MantineProvider>
    );
}

export default SiteLayout;
