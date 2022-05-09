import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useStyles } from '../styles/NavbarLinksGroupStyle';
import DynamicIcon from './DynamicIcon';

interface LinksGroupProps {
    icon?: string;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps) {
    const { classes, theme } = useStyles();
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const ChevronIcon = theme.dir === 'ltr' ? BsChevronRight : BsChevronLeft;
    const items = (hasLinks ? links : []).map((link) => (
        <Text className={classes.link} key={link.label}>
            <Link className={classes.linkItem} to={link.link}>
                {link.label}
            </Link>
        </Text>
    ));

    const iconElement = () => {
        if (Icon !== undefined) {
            return (
                <ThemeIcon variant="light" size={30}>
                    <DynamicIcon icon={Icon} size="18" color="black" />
                </ThemeIcon>
            );
        }

        return <></>;
    };

    return (
        <>
            <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                <Group position="apart" spacing={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {iconElement()}
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <ChevronIcon
                            className={classes.chevron}
                            size={14}
                            style={{
                                transform: opened
                                    ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                                    : 'none',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}
