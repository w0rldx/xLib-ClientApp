import { Box, Text } from '@mantine/core';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

function PasswordRequirement({
    meets,
    label,
}: {
    meets: boolean;
    label: string;
}) {
    return (
        <Text
            color={meets ? 'teal' : 'red'}
            sx={{ display: 'flex', alignItems: 'center' }}
            mt={7}
            size="sm"
        >
            {meets ? (
                <AiOutlineCheck size={14} />
            ) : (
                <AiOutlineClose size={14} />
            )}{' '}
            <Box ml={10}>{label}</Box>
        </Text>
    );
}
export default PasswordRequirement;
