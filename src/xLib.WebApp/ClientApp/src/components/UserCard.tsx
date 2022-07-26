import { Avatar, Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { IPost } from '../interfaces/Post';
import PostService from '../services/PostService';
import { useAuthStore } from '../stores/AuthStore';
import { useStyles } from '../styles/components/UserCardStyle';
import PostCard from './PostCard';

interface UserCardProps {
    userName: string;
    avatar?: string;
    fistName: string;
    lastName: string;
    email: string;
    roles: string[];
    headerPicture?: string;
    posts: IPost[];
    refetch: () => void;
}

function UserCard(props: UserCardProps) {
    const { classes } = useStyles();
    const [value, onChange] = useState('');
    const [user] = useAuthStore((state) => [state.getUser()]);
    const [token] = useAuthStore((s) => [s.getToken()]);
    const mutation = useMutation(() => {
        return PostService.createPost(token ? token : '', value);
    });

    console.log(props.posts);

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

    const addAsFriendButton = () => {
        if (props.userName !== user?.username) {
            return <Button>Add as Friend</Button>;
        } else {
            return <></>;
        }
    };

    const editProfileButton = () => {
        if (props.userName === user?.username) {
            return <Button>Edit Profile</Button>;
        } else {
            return <></>;
        }
    };

    const newPostEditor = () => {
        if (props.userName === user?.username) {
            return (
                <div className={classes.editorContainer}>
                    <RichTextEditor
                        className={classes.editor}
                        value={value}
                        onChange={onChange}
                        placeholder="Was gibt`s Neues?"
                    />
                    <div className={classes.postButtonContainer}>
                        <Button
                            className={classes.postButton}
                            onClick={() => makeNewPost()}
                        >
                            Post
                        </Button>
                    </div>
                </div>
            );
        }
    };

    async function makeNewPost() {
        const result = await mutation.mutateAsync();

        if (result) {
            props.refetch();
            onChange('');
        }
    }

    const postsElements = () => {
        if (props.posts?.length > 0) {
            return props.posts.map((post) => {
                return (
                    <PostCard
                        key={post.id}
                        id={post.id}
                        date={post.createdDate}
                        message={post.message}
                    />
                );
            });
        } else {
            return (
                <div className={classes.lastActivity}>
                    <Text size="xl">Keine Aktivitäten</Text>
                </div>
            );
        }
    };

    const postCard = () => {
        return (
            <div className={classes.postContainer}>
                {newPostEditor()}
                <div className={classes.lastActivity}>
                    <Text weight={700} size="xl">
                        Letzte Post:
                    </Text>
                </div>
                {postsElements()}
            </div>
        );
    };

    return (
        <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            className={classes.cardContainer}
        >
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
                <div className={classes.avatarContainer}>
                    {userAvatar()}
                    {editProfileButton()}
                    {addAsFriendButton()}
                </div>
                {userNameWithBadge()}
                <div className={classes.userName}>
                    <Text size={30} color="dimmed">
                        {props.userName === ''
                            ? 'Error No User Name'
                            : props.userName}
                    </Text>
                </div>
                {postCard()}
            </div>
        </Card>
    );
}

export default UserCard;
