import {
    Box,
    Text,
    TypographyStylesProvider,
    UnstyledButton,
} from '@mantine/core';
import { AiOutlineEdit } from 'react-icons/ai';
import { useStyles } from '../styles/components/PostCardStyle';

interface PostCardProps {
    id: string;
    message: string;
    date: string;
}

function PostCard(props: PostCardProps) {
    const { classes } = useStyles();

    const date = new Date(props.date);

    console.log(date);

    return (
        <div className={classes.postContainer}>
            <Box className={classes.postCard} p={0} mb={2}>
                <div className={classes.editContainer}>
                    <div className={classes.textContainer}>
                        <TypographyStylesProvider>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: props.message,
                                }}
                            />
                        </TypographyStylesProvider>
                    </div>
                    <div className={classes.editButtonContainer}>
                        <UnstyledButton>
                            <AiOutlineEdit />
                        </UnstyledButton>
                    </div>
                </div>
            </Box>
            <div className={classes.dateContainer}>
                <Text size="xs">
                    {date.getDay()}.{date.getMonth()}.{date.getFullYear()}{' '}
                    {date.getHours()}:{date.getMinutes()}
                </Text>
            </div>
        </div>
    );
}

export default PostCard;
