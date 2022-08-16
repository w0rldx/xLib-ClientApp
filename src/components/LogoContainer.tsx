import { Text } from '@mantine/core';

import { useStyles } from '../styles/components/LogoContainerStyle';

interface LogoContainerProps {
    weight: number;
    fontsize: number;
}

export function LogoContainer(props: LogoContainerProps) {
    const { classes } = useStyles();

    return (
        <div>
            <Text
                weight={props.weight}
                style={{ fontSize: props.fontsize + 'px' }}
                className={classes.logo}
            >
                {import.meta.env.VITE_APP_NAME}
            </Text>
        </div>
    );
}
