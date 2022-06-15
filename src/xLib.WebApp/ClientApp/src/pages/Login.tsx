import { Button, Card, Divider, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useContext, useState } from 'react';
import { AiFillUnlock } from 'react-icons/ai';
import { BiErrorAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import DarkmodeToggle from '../components/DarkmodeToggle';
import AuthContext from '../context/AuthContext';
import { IUserResponse } from '../interfaces/user';
import UserService from '../services/UserService';
import { useStyles } from '../styles/pages/LoginPage';

function Login() {
    const { classes } = useStyles();
    const { setUser } = useContext(AuthContext);
    const [loginButton, setLoginButton] = useState<JSX.Element>(loginButtonElement(false));

    function loginButtonElement(loading: boolean) {
        if (loading) {
            return (
                <Button type="submit" leftIcon={<AiFillUnlock />} loading disabled>
                    Login
                </Button>
            );
        } else {
            return (
                <Button type="submit" leftIcon={<AiFillUnlock />}>
                    Login
                </Button>
            );
        }
    }

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    function showErrorNotification(errorMessage: string) {
        showNotification({
            title: 'Error',
            message: errorMessage,
            color: 'red',
            icon: <BiErrorAlt />,
        });
    }

    async function onSubmit(values: typeof form.values) {
        try {
            setLoginButton(loginButtonElement(true));
            const value: IUserResponse = await UserService.getUserToken({
                email: values.email,
                password: values.password,
            });

            if (value) {
                form.setValues({
                    email: '',
                    password: '',
                });
            }
            setUser(value);
            console.log(value);
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 504) {
                    showErrorNotification(`No internet connection`);
                } else if (e.response?.status === 400) {
                    showErrorNotification(`Missing Username or Password`);
                } else if (e.response?.status === 401) {
                    showErrorNotification(`Unauthorized`);
                } else {
                    showErrorNotification(`${e.response?.data}`);
                }
            }
        }
        setLoginButton(loginButtonElement(false));
    }

    return (
        <>
            <div className={classes.container}>
                <div className={classes.header}>
                    <DarkmodeToggle />
                </div>
                <div className={classes.cardContainer}>
                    <Card shadow="sm" p="xl">
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
                            {loginButton}
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Login;
