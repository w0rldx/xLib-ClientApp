import { Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { getUserNavigationData } from '../data/UserNaviagationData';
import { useAuthStore } from '../stores/AuthStore';
import { useStyles } from '../styles/components/SingedInUserStyle';

function SingedInUser() {
    const { classes, theme } = useStyles();
    const user = useAuthStore((s) => s.getUser());
    const [opened, setOpened] = useState(false);
    const ChevronIcon = theme.dir === 'ltr' ? BsChevronRight : BsChevronLeft;

    const links = getUserNavigationData();

    const items = links.map((linkItem) => (
        <Menu.Item key={linkItem.index} component="button">
            {linkItem.label}
        </Menu.Item>
    ));

    const handleClick = () => {
        return setOpened((o) => !o);
    };

    return (
        <>
            <Menu
                opened={opened}
                position="right"
                withArrow
                placement="end"
                className={classes.user}
                control={
                    <UnstyledButton
                        onClick={handleClick}
                        className={classes.button}
                    >
                        <Group>
                            <div style={{ flex: 1 }}>
                                <Text size="sm" weight={500}>
                                    {user?.firstName + ' ' + user?.lastName}
                                </Text>

                                <Text color="dimmed" size="xs">
                                    {user?.email}
                                </Text>
                            </div>

                            <ChevronIcon
                                className={classes.chevron}
                                size={14}
                            />
                        </Group>
                    </UnstyledButton>
                }
            >
                {items}
            </Menu>
        </>
    );
}

export default SingedInUser;
