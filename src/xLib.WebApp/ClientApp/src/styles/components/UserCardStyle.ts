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
        marginTop: '0px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        marginRight: '50px',
    },

    postCard: {
        padding: '12px',
        width: '100%',
        marginLeft: '50px',
        minHeight: '50px',
        borderRadius: '5px',
    },

    editor: {
        marginRight: '20px',
        width: '100%',
    },

    editorContainer: {
        marginLeft: '50px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },

    postButtonContainer: {
        marginTop: '8px',
        width: '100%',
        textAlign: 'right',
    },

    postButton: {
        width: '150px',
    },

    lastActivity: {
        marginLeft: '50px',
    },
}));
export { useStyles };
