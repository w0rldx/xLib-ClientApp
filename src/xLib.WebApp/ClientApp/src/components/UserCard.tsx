import { Avatar, Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import { useStyles } from '../styles/components/UserCardStyle';

interface UserCardProps {
    userName: string;
    avatar?: string;
    fistName: string;
    lastName: string;
    email: string;
    roles: string[];
    headerPicture?: string;
}

function UserCard(props: UserCardProps) {
    const { classes } = useStyles();

    const userAvatar = () => {
        if (props.avatar === '') {
            return <Avatar className={classes.avatar} size={150} radius="xl" />;
        } else {
            return (
                <Avatar
                    className={classes.avatar}
                    size={150}
                    radius="xl"
                    src={props.avatar}
                />
            );
        }
    };

    const userNameWithBadge = () => {
        if (props.roles?.length > 0) {
            return (
                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{props.userName}</Text>
                    <Badge color="pink" variant="light">
                        On Sale
                    </Badge>
                </Group>
            );
        }
    };

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={
                        props.headerPicture === ''
                            ? 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
                            : props.headerPicture
                    }
                    height={300}
                />
            </Card.Section>

            <div className={classes.container}>
                {userAvatar()}
                {userNameWithBadge()}
                <Text size="sm" color="dimmed">
                    With Fjord Tours you can explore more of the magical fjord
                    landscapes with tours and activities on and around the
                    fjords of Norway
                </Text>

                <Button
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                >
                    Book classic tour now
                </Button>
            </div>
            {props.userName === '' ? 'Error No User Name' : props.userName}
        </Card>
    );
}

export default UserCard;
