import {
    Button,
    Card,
    Checkbox,
    Divider,
    PasswordInput,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { AiFillUnlock } from 'react-icons/ai';
import { BiErrorAlt } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';

import DarkModeToggle from '../components/DarkModeToggle';
import AuthenticatedError from '../exceptions/AuthenticatedError';
import { IIdentity, IIdentityLoginForm } from '../interfaces/Identity';
import IdentityService from '../services/IdentityService';
import { useAuthStore } from '../stores/AuthStore';
import { useStyles } from '../styles/pages/LoginPage';
import LocalStorageHelper from '../utils/LocalStorageHelper';
import SessionStorageHelper from '../utils/SessionStorageHelper';

function Login() {
    const { classes } = useStyles();
    const { setToken, setUser } = useAuthStore(
        (s) => ({
            setToken: s.setToken,
            setUser: s.setUser,
        }),
        shallow,
    );
    const mutation = useMutation((model: IIdentityLoginForm) => {
        return IdentityService.loginUser(model);
    });
    const navigate = useNavigate();
    const [loginButton, setLoginButton] = useState<JSX.Element>(
        loginButtonElement(false),
    );
    const [staySignIn, setStaySignIn] = useState<boolean>(false);

    function loginButtonElement(loading: boolean) {
        if (loading) {
            return (
                <Button
                    type="submit"
                    leftIcon={<AiFillUnlock />}
                    loading
                    disabled
                >
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
            email: (value: string) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email',
        },
    });

    function showErrorNotification(errorMessage: string) {
        showNotification({
            title: 'Error',
            message: errorMessage,
            color: 'red',
            icon: <BiErrorAlt />,
            radius: 'md',
            autoClose: 2500,
        });
    }

    async function onSubmit(values: typeof form.values) {
        try {
            setLoginButton(loginButtonElement(true));

            const tokenModel = await mutation.mutateAsync({
                email: values.email,
                password: values.password,
            });

            if (tokenModel && tokenModel.isAuthenticated === false) {
                throw new AuthenticatedError();
            }

            if (staySignIn) {
                LocalStorageHelper.setStaySignedInLocalStorage(true);
            } else {
                LocalStorageHelper.clearTokenLocalStorage();
                LocalStorageHelper.clearUserLocalStorage();
                SessionStorageHelper.clearTokenSessionStorage();
                SessionStorageHelper.clearUserSessionStorage();
                LocalStorageHelper.setStaySignedInLocalStorage(false);
            }

            if (tokenModel) {
                setToken(tokenModel.token);
                const userFetchData: IIdentity =
                    await IdentityService.getUserData(tokenModel.token);

                if (userFetchData) {
                    setUser(userFetchData);
                } else {
                    throw new Error('User data not found');
                }
            }

            navigate('/');
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 504) {
                    showErrorNotification('No Server connection');
                } else if (e.response?.status === 400) {
                    showErrorNotification('Missing Username or Password');
                } else if (e.response?.status === 401) {
                    showErrorNotification('Unauthorized');
                } else if (e.response?.status === 500) {
                    showErrorNotification('Login Failed');
                } else {
                    showErrorNotification(`${e.message}`);
                }
            } else if (e instanceof AuthenticatedError) {
                showErrorNotification('Authenticated Error');
            } else if (e instanceof Error) {
                showErrorNotification(`${e.message}`);
            }
        }
        setLoginButton(loginButtonElement(false));
    }

    return (
        <>
            <div className={classes.container}>
                <div className={classes.header}>
                    <DarkModeToggle />
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
                            onSubmit={form.onSubmit(
                                (values: typeof form.values) =>
                                    onSubmit(values),
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
                            <Checkbox
                                label="Stay signed in"
                                checked={staySignIn}
                                onChange={(event) =>
                                    setStaySignIn(event.currentTarget.checked)
                                }
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
