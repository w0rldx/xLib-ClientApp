import { createStyles } from '@mantine/core';

// Currently not working gridTemplateAreas is not working with getRef().... need more research why
const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: '0.5fr 1.5fr 1fr',
        gridTemplateRows: '0.2fr 1.8fr 1fr',
        gridAutoFlow: 'row',
        gridTemplateAreas: [
            `${getRef('sideBar')} ${getRef('topBar')} ${getRef('topBar')}`,
            `${getRef('sideBar')} ${getRef('content')} ${getRef('content')}`,
            `${getRef('sideBar')} ${getRef('content')} ${getRef('content')}`,
        ],
    },

    sideBar: {
        ref: getRef('sideBar'),
        gridArea: 'sideBar',
        minWidth: '200px',
        maxWidth: '350px',
    },

    topBar: {
        ref: getRef('topBar'),
        gridArea: 'topBar',
    },

    content: {
        ref: getRef('content'),
        gridArea: getRef('content'),
        padding: '8px',
    },
}));

export { useStyles };
