import { Avatar, Button, Divider, Image, Text } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import { useMutation } from '@tanstack/react-query';
import { createRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router';

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
    const rteRef = createRef<ReactQuill>();
    const [user] = useAuthStore((state) => [state.getUser()]);
    const [token] = useAuthStore((s) => [s.getToken()]);
    const navigate = useNavigate();
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

    const addAsFriendButton = () => {
        if (props.userName !== user?.userName) {
            return <Button>Add as Friend</Button>;
        } else {
            return <></>;
        }
    };

    const editProfileButton = () => {
        if (props.userName === user?.userName) {
            return (
                <Button onClick={() => navigate('/edit')}>Edit Profile</Button>
            );
        } else {
            return <></>;
        }
    };

    const messageButton = () => {
        if (props.userName !== user?.userName) {
            return <Button>Message</Button>;
        } else {
            return <></>;
        }
    };

    const newPostEditor = () => {
        if (props.userName === user?.userName) {
            return (
                <div className={classes.editorContainer}>
                    <RichTextEditor
                        ref={rteRef}
                        className={classes.editor}
                        value={value}
                        onChange={onChange}
                        placeholder="Was gibt`s Neues?"
                    />
                    <div className={classes.postButtonContainer}>
                        <Button
                            className={classes.postButton}
                            onClick={() => {
                                makeNewPost();
                                onChange('');
                                rteRef.current?.editor?.setText('');
                            }}
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
        }
    }

    const postsElements = () => {
        if (props.posts?.length > 0) {
            return props.posts.map((post) => {
                return (
                    <>
                        <div className={classes.postCard} key={post.id}>
                            <PostCard
                                id={post.id}
                                date={post.createdDate}
                                message={post.message}
                            />
                        </div>
                        <Divider
                            my="sm"
                            variant="dashed"
                            className={classes.divider}
                        />
                    </>
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
                        Letzte Aktivitäten:
                    </Text>
                </div>
                {postsElements()}
            </div>
        );
    };

    return (
        <>
            <div className={classes.cardContainer}>
                <Image
                    src={
                        props.headerPicture === ''
                            ? 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
                            : props.headerPicture
                    }
                    height={300}
                />
                <div className={classes.container}>
                    <div className={classes.avatarContainer}>
                        {userAvatar()}
                        <Text size={30} color="dimmed">
                            {props.userName === ''
                                ? 'Error No User Name'
                                : props.userName}
                        </Text>
                        {editProfileButton()}
                        {addAsFriendButton()}
                        {messageButton()}
                    </div>
                    {postCard()}
                </div>
            </div>
        </>
    );
}

export default UserCard;
