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

export function getNavigationData(): NavigationItem[] {
    return [
        {
            label: 'Home',
            icon: 'ai/AiOutlineDashboard',
            link: '/',
            links: [],
            index: 0,
            initiallyOpened: true,
        },
        {
            label: 'User',
            icon: 'ai/AiOutlineUser',
            link: '/user/@user',
            links: [],
            index: 1,
            initiallyOpened: false,
        },
        {
            label: 'Messages',
            icon: 'ai/AiOutlineMessage',
            link: '/user/messages',
            links: [],
            index: 2,
            initiallyOpened: false,
        },
    ];
}
