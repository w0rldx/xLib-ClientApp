import { Group, Navbar, ScrollArea } from '@mantine/core';
import React from 'react';
import {
    Adjustments,
    CalendarStats,
    FileAnalytics,
    Gauge,
    Lock,
    Notes,
    PresentationAnalytics,
} from 'tabler-icons-react';
import { useStyles } from '../styles/NavBarPanelStyle';
import { LogoContainer } from './LogoContainer';
import { LinksGroup } from './NavbarLinksGroup';
import { VersionContainer } from './VersionContainer';

const mockdata = [
    { label: 'Dashboard', icon: Gauge },
    {
        label: 'Market news',
        icon: Notes,
        initiallyOpened: true,
        links: [
            { label: 'Overview', link: '/' },
            { label: 'Forecasts', link: '/' },
            { label: 'Outlook', link: '/' },
            { label: 'Real time', link: '/' },
        ],
    },
    {
        label: 'Releases',
        icon: CalendarStats,
        links: [
            { label: 'Upcoming releases', link: '/' },
            { label: 'Previous releases', link: '/' },
            { label: 'Releases schedule', link: '/' },
        ],
    },
    { label: 'Analytics', icon: PresentationAnalytics },
    { label: 'Contracts', icon: FileAnalytics },
    { label: 'Settings', icon: Adjustments },
    {
        label: 'Security',
        icon: Lock,
        links: [
            { label: 'Enable 2FA', link: '/' },
            { label: 'Change password', link: '/' },
            { label: 'Recovery codes', link: '/' },
        ],
    },
];

interface NavBarPanelProps {
    width: number;
}

export function NavBarPanel(props: NavBarPanelProps) {
    const { classes } = useStyles();
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
        <Navbar p="md" className={classes.navbar} width={{ base: props.width }}>
            <Navbar.Section className={classes.header}>
                <Group position="apart">
                    <LogoContainer weight={600} fontsize={30} />
                    <VersionContainer />
                </Group>
            </Navbar.Section>

            <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>Footer</Navbar.Section>
        </Navbar>
    );
}
