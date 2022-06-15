import { Button, Card, Divider, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { AiFillUnlock } from 'react-icons/ai';
import { BiErrorAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import DarkmodeToggle from '../components/DarkmodeToggle';
import { IUserResponse } from '../models/user';
import UserService from '../services/UserService';
import { useStyles } from '../styles/pages/LoginPage';

function Login() {
    const { classes } = useStyles();

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
        try {
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
            console.log(value);
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                if (!e?.response) {
                    showNotification({
                        title: 'Error',
                        message: `${e?.response}`,
                        color: 'red',
                        icon: <BiErrorAlt />,
                    });
                } else {
                    showNotification({
                        title: 'Error',
                        message: `${e}`,
                        color: 'red',
                        icon: <BiErrorAlt />,
                    });
                }
            }
        }
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
