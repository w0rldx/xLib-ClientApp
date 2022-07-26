import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    cardContainer: {
        minHeight: '100%',
        minWidth: '100%',
    },

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

    postCard: {
        padding: '12px',
        width: '100%',
        marginLeft: '20px',
        minHeight: '50px',
        borderRadius: '5px',
    },

    editor: {
        marginLeft: '20px',
        width: '100%',
    },
}));
export { useStyles };
