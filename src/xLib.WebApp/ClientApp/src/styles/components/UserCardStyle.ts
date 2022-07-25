import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 30,
    },

    avatar: {
        marginTop: 0,
    },

    avatarContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
    },

    userName: {
        marginLeft: 22,
    },

    postContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
}));

export { useStyles };
