import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    cardContainer: {
        minHeight: '100%',
        minWidth: '100%',
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    },

    container: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '30px',
    },

    avatar: {
        marginTop: '0px',
    },

    avatarContainer: {
        marginLeft: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
    },

    postContainer: {
        marginTop: '0px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        marginLeft: '50px',
    },

    postCard: {
        padding: '12px',
        marginRight: '20px',
        minHeight: '50px',
        borderRadius: '5px',
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[0],
    },

    editor: {
        marginRight: '20px',
        width: '100%',
        border: '0.5px solid',
        borderColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[2],
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[0],
    },

    editorContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '20px',
        padding: '10px',
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[0],
    },

    postButtonContainer: {
        marginTop: '8px',
        width: '100%',
        textAlign: 'right',
    },

    postButton: {
        width: '150px',
    },

    lastActivity: {},

    divider: {
        width: '100%',
    },
}));
export { useStyles };
