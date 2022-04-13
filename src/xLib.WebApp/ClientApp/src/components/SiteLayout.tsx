import { AppShell, Header, Navbar } from '@mantine/core';
import React from 'react';
import '../styles/SiteLayout.scss';

type Props = {
    children?: React.ReactChild | React.ReactChild[];
    navbar?: React.ReactNode;
    sidePanel?: React.ReactNode;
};

function SiteLayout({ children, navbar, sidePanel }: Props) {
    return (
        <AppShell
            padding="md"
            navbar={<Navbar className="sidePanel">{sidePanel}</Navbar>}
            header={
                <Header className="navbar" height={64}>
                    {navbar}
                </Header>
            }
        >
            {children}
        </AppShell>
    );
}

export default SiteLayout;
