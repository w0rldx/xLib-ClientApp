import { Button, Card, Divider, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { AiFillLock } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import DarkmodeToggle from '../components/DarkmodeToggle';
import { useStyles } from '../styles/pages/RegisterPage';

function Register() {
    const { classes } = useStyles();
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },

        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
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
                                    Register
                                </Text>
                                <Divider my="sm" />
                            </div>
                        </Card.Section>
                        <form
                            className={classes.cardContent}
                            onSubmit={form.onSubmit((values: unknown) => console.log(values))}
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

                            <Button type="submit" leftIcon={<AiFillLock />}>
                                Register
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Register;
