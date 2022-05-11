interface NavigationItem {
    label: string;
    icon: string;
    initiallyOpened?: boolean;
    index: number;
    links: NavBarLinkItem[];
}

interface NavBarLinkItem {
    label: string;
    link: string;
}

export function getNavigationData(): NavigationItem[] {
    return [
        {
            label: 'Dashboard',
            icon: 'ai/AiOutlineDashboard',
            links: [],
            index: 0,
            initiallyOpened: true,
        },
        {
            label: 'Market news',
            icon: 'ai/AiOutlineProject',
            links: [
                {
                    label: 'Overview',
                    link: '/',
                },
                {
                    label: 'Forecasts',
                    link: '/',
                },
                {
                    label: 'Outlook',
                    link: '/',
                },
                {
                    label: 'Real time',
                    link: '/',
                },
            ],
            index: 1,
        },
        {
            label: 'Releases',
            icon: 'ai/AiOutlineCalendar',
            links: [
                {
                    label: 'Upcoming releases',
                    link: '/',
                },
                {
                    label: 'Previous releases',
                    link: '/',
                },
                {
                    label: 'Releases schedule',
                    link: '/',
                },
            ],
            index: 2,
        },
        {
            label: 'Analytics',
            icon: 'ai/AiOutlineFundProjectionScreen',
            links: [],
            index: 3,
        },
        {
            label: 'Contracts',
            icon: 'ai/AiOutlineFile',
            links: [],
            index: 4,
        },
        {
            label: 'Security',
            icon: 'ai/AiOutlineLock',
            links: [
                {
                    label: 'Enable 2FA',
                    link: '/',
                },
                {
                    label: 'Change password',
                    link: '/',
                },
                {
                    label: 'Recovery codes',
                    link: '/',
                },
            ],
            index: 5,
        },
        {
            label: 'Settings',
            icon: 'ai/AiOutlineSetting',
            links: [],
            index: 6,
        },
    ];
}
