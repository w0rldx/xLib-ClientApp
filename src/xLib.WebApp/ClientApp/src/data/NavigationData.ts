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
            label: 'Dashboard',
            icon: 'ai/AiOutlineDashboard',
            link: '/',
            links: [],
            index: 0,
            initiallyOpened: true,
        },
        {
            label: 'Market news',
            icon: 'ai/AiOutlineProject',
            link: '',
            links: [
                {
                    label: 'Overview',
                    link: 'overview',
                },
                {
                    label: 'Forecasts',
                    link: 'forecasts',
                },
                {
                    label: 'Outlook',
                    link: 'outlook',
                },
                {
                    label: 'Real time',
                    link: 'realtime',
                },
            ],
            index: 1,
        },
        {
            label: 'Releases',
            icon: 'ai/AiOutlineCalendar',
            link: '',
            links: [
                {
                    label: 'Upcoming releases',
                    link: 'upcomingreleases',
                },
                {
                    label: 'Previous releases',
                    link: 'previousreleases',
                },
                {
                    label: 'Releases schedule',
                    link: 'releasesschedule',
                },
            ],
            index: 2,
        },
        {
            label: 'Analytics',
            icon: 'ai/AiOutlineFundProjectionScreen',
            link: 'Analytics',
            links: [],
            index: 3,
        },
        {
            label: 'Contracts',
            icon: 'ai/AiOutlineFile',
            link: 'Contracts',
            links: [],
            index: 4,
        },
        {
            label: 'Security',
            icon: 'ai/AiOutlineLock',
            link: '',
            links: [
                {
                    label: 'Enable 2FA',
                    link: '2fa',
                },
                {
                    label: 'Change password',
                    link: 'changepassword',
                },
                {
                    label: 'Recovery codes',
                    link: 'recoverycodes',
                },
            ],
            index: 5,
        },
        {
            label: 'Settings',
            icon: 'ai/AiOutlineSetting',
            link: '',
            links: [],
            index: 6,
        },
    ];
}
