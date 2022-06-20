import {
    Button,
    Card,
    Divider,
    PasswordInput,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { AiFillUnlock } from 'react-icons/ai';
import { BiErrorAlt } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';
import AuthenticatedError from '../exceptions/AuthenticatedError';
import { ITokenResponse } from '../interfaces/user';
import UserService from '../services/UserService';
import { useAuthStore } from '../stores/AuthStore';
import { useStyles } from '../styles/pages/RegisterPage';
import LocalStorageHelper from '../utils/LocalStorageHelper';

function Register() {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const [setUser, setToken] = useAuthStore((s) => [s.setUser, s.setToken]);
    const [registerButton, setRegisterButton] = useState<JSX.Element>(
        registerButtonElement(false),
    );

    function registerButtonElement(loading: boolean) {
        if (loading) {
            return (
                <Button
                    type="submit"
                    leftIcon={<AiFillUnlock />}
                    loading
                    disabled
                >
                    Register
                </Button>
            );
        } else {
            return (
                <Button type="submit" leftIcon={<AiFillUnlock />}>
                    Register
                </Button>
            );
        }
    }

    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            userName: '',
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
            setRegisterButton(registerButtonElement(true));
            const tokenModel: ITokenResponse = await UserService.registerUser({
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                userName: values.userName,
            });

            LocalStorageHelper.setStaySignedInLocalStorage(false);

            if (tokenModel && tokenModel.isAuthenticated === false) {
                throw new AuthenticatedError();
            }

            if (tokenModel) {
                setToken(tokenModel.token);
            }

            const userModel = await UserService.getUserData(tokenModel.token);
            if (userModel) {
                setUser(userModel);
            } else {
                throw new Error('User data not found');
            }

            navigate('/');
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 504) {
                    showErrorNotification(`No Server connection`);
                } else if (e.response?.status === 400) {
                    showErrorNotification(`Missing Username or Password`);
                } else if (e.response?.status === 401) {
                    showErrorNotification(`Unauthorized`);
                } else if (e.response?.status === 500) {
                    showErrorNotification(`Register Failed`);
                } else {
                    showErrorNotification(`${e.message}`);
                }
            }

            if (e instanceof AuthenticatedError) {
                showErrorNotification('Authenticated Error');
            } else if (e instanceof Error) {
                showErrorNotification(`${e.message}`);
            }
        }
        setRegisterButton(registerButtonElement(false));
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
                                    Register
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
                                placeholder="First Name"
                                label="First Name:"
                                {...form.getInputProps('firstName')}
                                required
                            />
                            <TextInput
                                placeholder="Last Name"
                                label="Last Name:"
                                {...form.getInputProps('lastName')}
                                required
                            />
                            <TextInput
                                placeholder="Username"
                                label="Username:"
                                {...form.getInputProps('userName')}
                                required
                            />
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
                                <Text size="sm">Already have an account?</Text>
                                <Link className={classes.link} to="/login">
                                    Login
                                </Link>
                            </div>
                            {registerButton}
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Register;
