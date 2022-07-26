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
        marginLeft: '50px',
        minHeight: '50px',
        borderRadius: '5px',
    },

    dateContainer: {
        width: '100%',
        textAlign: 'right',
        marginLeft: '50px',
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
