import {
    Box,
    Collapse,
    Group,
    Text,
    ThemeIcon,
    UnstyledButton,
} from '@mantine/core';
import { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useStyles } from '../styles/components/NavbarLinksGroupStyle';
import DynamicIcon from './DynamicIcon';

interface LinksGroupProps {
    icon?: string;
    label: string;
    initiallyOpened?: boolean;
    link: string;
    links?: { label: string; link: string }[];
}

export function LinksGroup({
    icon: Icon,
    label,
    initiallyOpened,
    links,
    link,
}: LinksGroupProps) {
    const { classes, theme } = useStyles();
    const hasLinks = Array.isArray(links);
    const hasLink = link !== '' && link.length > 0;
    const [opened, setOpened] = useState(initiallyOpened || false);
    const ChevronIcon = theme.dir === 'ltr' ? BsChevronRight : BsChevronLeft;
    const navigate = useNavigate();

    const items = (hasLinks ? links : []).map((linkItem) => (
        <Text className={classes.link} key={linkItem.label}>
            <Link className={classes.linkItem} to={linkItem.link}>
                {linkItem.label}
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

    const handleClick = () => {
        if (hasLink) {
            return navigate(link ? link : '');
        }

        return setOpened((o) => !o);
    };

    return (
        <>
            <UnstyledButton onClick={handleClick} className={classes.control}>
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
                                    ? `rotate(${
                                          theme.dir === 'rtl' ? -90 : 90
                                      }deg)`
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
