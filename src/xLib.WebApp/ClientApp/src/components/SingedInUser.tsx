import { Divider, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../stores/AuthStore';
import { useStyles } from '../styles/components/SingedInUserStyle';

function SingedInUser() {
    const { classes, theme } = useStyles();
    const navigate = useNavigate();
    const [getUser, clearToken, clearUser] = useAuthStore((s) => [
        s.getUser(),
        s.clearToken,
        s.clearUser,
    ]);
    const [opened, setOpened] = useState(false);
    const ChevronIcon = theme.dir === 'ltr' ? BsChevronRight : BsChevronLeft;

    const handleClick = () => {
        return setOpened((o) => !o);
    };

    function userLogout() {
        clearToken();
        clearUser();
        navigate('/login');
    }

    function userSettings() {
        navigate('/settings');
    }

    function userProfile() {
        navigate(`/user/${getUser?.username}`);
    }

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
                                    {getUser?.firstName +
                                        ' ' +
                                        getUser?.lastName}
                                </Text>

                                <Text color="dimmed" size="xs">
                                    {getUser?.email}
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
                <Menu.Item
                    icon={<MdOutlineAccountCircle size={14} />}
                    component="button"
                    onClick={() => userProfile()}
                >
                    Profile
                </Menu.Item>
                <Menu.Item
                    icon={<AiOutlineSetting size={14} />}
                    component="button"
                    onClick={() => userSettings()}
                >
                    Settings
                </Menu.Item>
                <Divider />
                <Menu.Item
                    icon={<BiLogOut size={14} />}
                    component="button"
                    onClick={() => userLogout()}
                >
                    Sign out
                </Menu.Item>
            </Menu>
        </>
    );
}

export default SingedInUser;
