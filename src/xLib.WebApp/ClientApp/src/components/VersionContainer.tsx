import { Code, Text } from '@mantine/core';

export function VersionContainer() {
    const development = () => {
        if (process.env.NODE_ENV === 'development') {
            return (
                <Code sx={{ fontWeight: 700 }}>
                    <Text color="red" inherit component="span">
                        DEV
                    </Text>{' '}
                    <Text color="gray" inherit component="span">
                        {process.env.VERSION}
                    </Text>
                </Code>
            );
        } else {
            return <Code sx={{ fontWeight: 700 }}>{process.env.VERSION}</Code>;
        }
    };

    return <div>{development()}</div>;
}
