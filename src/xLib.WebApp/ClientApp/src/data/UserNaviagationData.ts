interface NavigationItem {
    label: string;
    icon: string;
    index: number;
    link: string;
}

export function getUserNavigationData(): NavigationItem[] {
    return [
        {
            label: 'Profile',
            icon: 'md/MdOutlineAccountCircle',
            link: '/user/',
            index: 0,
        },
        {
            label: 'Settings',
            icon: 'ai/AiOutlineSetting',
            link: '/user/settings',
            index: 1,
        },

        {
            label: 'Sign out',
            icon: 'bi/BiLogOut',
            link: '/',
            index: 2,
        },
    ];
}
