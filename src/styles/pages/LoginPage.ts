import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
    },

    header: {
        marginTop: '15px',
        float: 'right',
        position: 'absolute',
        right: '15px',
    },

    cardContainer: {
        backgroundColor: theme.colorScheme,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px',
        width: '400px',
    },

    topTextHeader: {
        textAlign: 'center',
    },

    topText: {
        fontSize: '1.5rem',
    },

    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },

    loginContainer: {
        display: 'flex',
        gap: '5px',
    },

    link: {
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: '#1c7ed6',

        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

export { useStyles };
