import { Button, Card, Divider, PasswordInput, Text, TextInput } from '@mantine/core';
import React from 'react';
import { AiFillUnlock } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import DarkmodeToggle from '../components/DarkmodeToggle';
import { useStyles } from '../styles/pages/LoginPage';

function Login() {
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.container}>
                <div className={classes.header}>
                    <DarkmodeToggle />
                </div>
                <div className={classes.cardContainer}>
                    <Card shadow="sm" p="xl" component="a" target="_blank">
                        <Card.Section>
                            <div className={classes.topTextHeader}>
                                <Text className={classes.topText} size="xl">
                                    Login
                                </Text>
                                <Divider my="sm" />
                            </div>
                        </Card.Section>
                        <div className={classes.cardContent}>
                            <TextInput placeholder="Your email" label="Email:" required />
                            <PasswordInput placeholder="Password" label="Password:" required />
                            <div className={classes.loginContainer}>
                                <Text size="sm">New to xLib?</Text>
                                <Link className={classes.link} to="/register">
                                    Register
                                </Link>
                            </div>

                            <Button leftIcon={<AiFillUnlock />} loading>
                                Login
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Login;
