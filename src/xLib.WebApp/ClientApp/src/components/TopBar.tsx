import { Group } from '@mantine/core';
import { useStyles } from '../styles/components/TopBarStyle';
import DarkmodeToggle from './DarkmodeToggle';

interface TopBarProps {
    height: number;
}

export function TopBar(props: TopBarProps) {
    const { classes } = useStyles();

    return (
        <div style={{ height: props.height }} className={classes.header}>
            <div className={classes.inner}>
                <Group ml={50} spacing={5}></Group>
                <DarkmodeToggle />
            </div>
        </div>
    );
}
