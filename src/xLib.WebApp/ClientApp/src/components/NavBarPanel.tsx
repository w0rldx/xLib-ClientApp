import { Group, Navbar, ScrollArea } from '@mantine/core';
import React from 'react';
import { useQuery } from 'react-query';
import NavigationService from '../services/NavigationService';
import { useStyles } from '../styles/NavBarPanelStyle';
import { LogoContainer } from './LogoContainer';
import { LinksGroup } from './NavbarLinksGroup';
import { VersionContainer } from './VersionContainer';

interface NavBarPanelProps {
    width: number;
}

interface NavigationItem {
    label: string;
    icon: string;
    initiallyOpened?: boolean;
    index: number;
    link: string;
    links: NavBarLinkItem[];
}

interface NavBarLinkItem {
    label: string;
    link: string;
}

export function NavBarPanel(props: NavBarPanelProps) {
    const { data } = useQuery<NavigationItem[]>(['navbarItems'], NavigationService.getNavigation);
    const { classes } = useStyles();

    data?.sort(function (a, b) {
        return a.index - b.index;
    });

    const links = data?.map((item) => {
        return (
            <LinksGroup
                key={item.label}
                icon={item.icon}
                label={item.label}
                link={item.link ? item.link : ''}
                links={!item.links.length ? undefined : item.links}
            />
        );
    });

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
