import { Group, Text, UnstyledButton } from '@mantine/core';
import { BsChevronRight } from 'react-icons/bs';
import { useAuthStore } from '../stores/AuthStore';
import { useStyles } from '../styles/components/SingedInUserStyle';

function SingedInUser() {
    const { classes } = useStyles();
    const user = useAuthStore((s) => s.getUser());

    return (
        <UnstyledButton className={classes.user}>
            <Group>
                <div style={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                        {user?.firstName + ' ' + user?.lastName}
                    </Text>

                    <Text color="dimmed" size="xs">
                        {user?.email}
                    </Text>
                </div>

                <BsChevronRight size={14} />
            </Group>
        </UnstyledButton>
    );
}

export default SingedInUser;
