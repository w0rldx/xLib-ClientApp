import { Group, Navbar, ScrollArea } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import NavigationService from '../services/NavigationService';
import { useAuthStore } from '../stores/AuthStore';
import { useStyles } from '../styles/components/NavBarPanelStyle';
import { LogoContainer } from './LogoContainer';
import { LinksGroup } from './NavbarLinksGroup';
import SingedInUser from './SingedInUser';
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
    const [user] = useAuthStore((state) => [state.getUser()]);
    const { data } = useQuery<NavigationItem[]>(
        ['navbarItems'],
        NavigationService.getNavigation,
    );
    const { classes } = useStyles();

    data?.sort(function (a, b) {
        return a.index - b.index;
    });

    const links = data?.map((item) => {
        const userName = user?.userName ? user.userName : '';
        if (item.link.includes('@user')) {
            const url = item.link.replace('@user', userName);
            return (
                <LinksGroup
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    link={url}
                    links={!item.links.length ? undefined : item.links}
                />
            );
        }
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

            <Navbar.Section
                grow
                className={classes.links}
                component={ScrollArea}
            >
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <SingedInUser />
            </Navbar.Section>
        </Navbar>
    );
}
