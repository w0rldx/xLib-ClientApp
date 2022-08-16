import { Button, Checkbox, FileInput, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BiCheckCircle, BiErrorAlt } from 'react-icons/bi';

import { IIdentity } from '../interfaces/Identity';
import IdentityService from '../services/IdentityService';
import UserService from '../services/UserService';
import { useAuthStore } from '../stores/AuthStore';

function EditUser() {
    // const { classes } = useStyles();
    const [avatar, setAvatar] = useState<File | null>(null);
    const [header, setHeader] = useState<File | null>(null);
    const [user] = useAuthStore((state) => [state.getUser()]);
    const [setUser] = useAuthStore((s) => [s.setUser]);
    const [token] = useAuthStore((state) => [state.getToken()]);
    const mutation = useMutation(
        (values: {
            firstName: string;
            lastName: string;
            userName: string;
            private: boolean;
        }) => {
            return UserService.updateUserData(
                token ? token : '',
                values,
                avatar,
                header,
            );
        },
    );
    const { data, refetch, error } = useQuery<IIdentity, Error>(
        ['userData'],
        () => IdentityService.getUserData(token ? token : ''),
        {
            enabled: false,
        },
    );

    const form = useForm({
        initialValues: {
            firstName: user?.firstName ?? '',
            lastName: user?.lastName ?? '',
            userName: user?.userName ?? '',
            private: user?.private ?? false,
        },
    });

    async function onSubmit(values: typeof form.values) {
        const result = await mutation.mutateAsync(values);
        if (result?.request.status === 200) {
            await refetch();

            if (error == null && data !== undefined) {
                setUser(data);
                showSuccessNotification('User updated successfully');
            }

            if (error != null) {
                showErrorNotification(error.message);
            }
        } else {
            showErrorNotification('Error updating user');
        }
    }

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

    function showSuccessNotification(errorMessage: string) {
        showNotification({
            title: 'Updated User',
            message: errorMessage,
            color: 'green',
            icon: <BiCheckCircle />,
            radius: 'md',
            autoClose: 2500,
        });
    }

    return (
        <div>
            <FileInput
                placeholder="Avatar Image"
                label="Avatar"
                description="Max file size: 1MB and 500px x 500px"
                accept="image/png,image/jpeg"
                value={avatar}
                onChange={setAvatar}
            />
            <FileInput
                placeholder="Header Image"
                label="Header"
                description="Max file size: 1MB and 1000px x 1000px"
                accept="image/png,image/jpeg"
                value={header}
                onChange={setHeader}
            />
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <TextInput
                    label="First Name"
                    placeholder=""
                    {...form.getInputProps('firstName')}
                />
                <TextInput
                    label="Last Name"
                    placeholder=""
                    {...form.getInputProps('lastName')}
                />
                <TextInput
                    label="Username"
                    placeholder=""
                    {...form.getInputProps('userName')}
                />
                <Checkbox
                    mt="md"
                    label="Private Profile"
                    {...form.getInputProps('private', {
                        type: 'checkbox',
                    })}
                />
                <Group position="right" mt="md">
                    <Button type="submit">Update</Button>
                </Group>
            </form>
        </div>
    );
}

export default EditUser;
