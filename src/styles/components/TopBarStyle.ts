import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        background:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? '#2C2E33' : '#e9ecef'
        }`,
    },

    inner: {
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

export { useStyles };
