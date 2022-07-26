import { createStyles } from '@mantine/core';

// Currently not working gridTemplateAreas is not working with getRef().... need more research why
const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },

    topBar: {
        width: '100%',
        height: '50px',
        position: 'fixed',
        overflow: 'hidden',
        top: 0,
        zIndex: 1,
    },

    content: {
        padding: '8px',
        marginLeft: '250px',
        marginTop: '50px',
        flex: 1,
    },
}));

export { useStyles };
