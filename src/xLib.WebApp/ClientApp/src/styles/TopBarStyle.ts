import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },

    inner: {
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

export { useStyles };
