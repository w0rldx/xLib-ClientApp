import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    postContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },

    postCard: {
        padding: '12px',
        width: '100%',
        minHeight: '60px',
        borderRadius: '5px',
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[0],
    },

    dateContainer: {
        width: '100%',
        textAlign: 'right',
    },

    editContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },

    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '99%',
    },

    editButtonContainer: {
        width: '1%',
        marginRight: '10px',
    },
}));

export { useStyles };
