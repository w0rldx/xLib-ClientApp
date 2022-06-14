import { createStyles } from '@mantine/core';

// Currently not working gridTemplateAreas is not working with getRef().... need more research why
const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },

    topBar: {
        maxHeight: '50px',
    },

    content: {
        padding: '8px',
        flex: 1,
    },
}));

export { useStyles };
