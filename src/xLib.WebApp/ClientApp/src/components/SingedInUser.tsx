import {
    Avatar,
    Divider,
    Group,
    Menu,
    Text,
    UnstyledButton,
} from '@mantine/core';
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
    const ChevronIcon = theme.dir === 'ltr' ? BsChevronRight : BsChevronLeft;

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

    const userAvatar = () => {
        if (getUser?.profilePicture !== '') {
            return <Avatar className={classes.avatar} radius="xl" />;
        } else {
            return (
                <Avatar
                    className={classes.avatar}
                    radius="xl"
                    src={getUser?.profilePicture}
                />
            );
        }
    };

    return (
        <>
            <Menu position="right-end" withArrow width={160}>
                <Menu.Target>
                    <UnstyledButton className={classes.button}>
                        <Group>
                            {userAvatar()}
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
                </Menu.Target>
                <Menu.Dropdown>
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
                </Menu.Dropdown>
            </Menu>
        </>
    );
}

export default SingedInUser;
