import { Button, Card, Divider, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { AiFillUnlock } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import DarkmodeToggle from '../components/DarkmodeToggle';
import UserService from '../services/UserService';
import { useStyles } from '../styles/pages/LoginPage';

function Login() {
    const { classes } = useStyles();
    const { data } = useQuery<NavigationItem[]>(['navbarItems'], UserService.getUserToken);

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    async function onSubmit(values: typeof form.values) {
        const value = await UserService.getUserToken(values.email, values.password);
        console.log(value);
    }

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

                        <form
                            className={classes.cardContent}
                            onSubmit={form.onSubmit((values: typeof form.values) =>
                                onSubmit(values)
                            )}
                        >
                            <TextInput
                                placeholder="Your email"
                                label="Email:"
                                {...form.getInputProps('email')}
                                required
                            />
                            <PasswordInput
                                placeholder="Password"
                                label="Password:"
                                {...form.getInputProps('password')}
                                required
                            />
                            <div className={classes.loginContainer}>
                                <Text size="sm">New to xLib?</Text>
                                <Link className={classes.link} to="/register">
                                    Register
                                </Link>
                            </div>
                            <Button type="submit" leftIcon={<AiFillUnlock />}>
                                Login
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Login;
