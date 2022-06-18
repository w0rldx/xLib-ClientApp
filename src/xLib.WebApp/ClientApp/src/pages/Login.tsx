import { Button, Card, Checkbox, Divider, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useContext, useState } from 'react';
import { AiFillUnlock } from 'react-icons/ai';
import { BiErrorAlt } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import DarkmodeToggle from '../components/DarkmodeToggle';
import AuthContext from '../context/AuthContext';
import AuthenticatedError from '../exceptions/AuthenticatedError';
import { ITokenResponse, IUser } from '../interfaces/user';
import UserService from '../services/UserService';
import { useStyles } from '../styles/pages/LoginPage';
import LocalStorageHelper from '../utils/LocalStorageHelper';

function Login() {
    const { classes } = useStyles();
    const { setToken, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loginButton, setLoginButton] = useState<JSX.Element>(loginButtonElement(false));
    const [staySignIn, setStaySignIn] = useState<boolean>(false);

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
            radius: 'md',
            autoClose: 2500,
        });
    }

    async function onSubmit(values: typeof form.values) {
        try {
            setLoginButton(loginButtonElement(true));
            const tokenModel: ITokenResponse = await UserService.loginUser({
                email: values.email,
                password: values.password,
            });

            if (tokenModel.isAuthenticated) {
                setToken(tokenModel.token);
            } else {
                throw new AuthenticatedError();
            }

            if (tokenModel) {
                try {
                    const userFetchData: IUser = await UserService.getUserData(tokenModel.token);
                    if (userFetchData) {
                        setUser(userFetchData);
                        LocalStorageHelper.setUserLocalStorage(userFetchData);
                        sessionStorage.setItem('user', JSON.stringify(userFetchData));
                    } else {
                        LocalStorageHelper.clearUserLocalStorage();
                        LocalStorageHelper.clearTokenLocalStorage();
                    }
                } catch (error) {
                    LocalStorageHelper.clearUserLocalStorage();
                    LocalStorageHelper.clearTokenLocalStorage();
                }
            }

            if (staySignIn) {
                LocalStorageHelper.setTokenLocalStorage(tokenModel.token);
                LocalStorageHelper.setStaySignedInLocalStorage(true);
            } else {
                sessionStorage.setItem('token', tokenModel.token);

                LocalStorageHelper.clearTokenLocalStorage();
                LocalStorageHelper.clearUserLocalStorage();
                LocalStorageHelper.setStaySignedInLocalStorage(false);
            }

            navigate('/');
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                console.log(e);

                if (e.response?.status === 504) {
                    showErrorNotification(`No Server connection`);
                } else if (e.response?.status === 400) {
                    showErrorNotification(`Missing Username or Password`);
                } else if (e.response?.status === 401) {
                    showErrorNotification(`Unauthorized`);
                } else if (e.response?.status === 500) {
                    showErrorNotification(`Login Failed`);
                } else {
                    showErrorNotification(`${e.message}`);
                }
            }

            if (e instanceof AuthenticatedError) {
                showErrorNotification(`Authenticated Error`);
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
                            <Checkbox
                                label="Stay signed in"
                                checked={staySignIn}
                                onChange={(event) => setStaySignIn(event.currentTarget.checked)}
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
