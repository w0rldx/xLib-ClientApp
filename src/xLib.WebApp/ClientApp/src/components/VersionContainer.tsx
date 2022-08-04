import { Code, Text } from '@mantine/core';

export function VersionContainer() {
    const development = () => {
        if (process.env.NODE_ENV === 'development') {
            return (
                <Code sx={{ fontWeight: 700 }}>
                    <Text color="red" inherit component="span">
                        DEV
                    </Text>{' '}
                    <Text inherit component="span">
                        {import.meta.env.VITE_VERSION}
                    </Text>
                </Code>
            );
        } else {
            return (
                <Code sx={{ fontWeight: 700 }}>
                    {import.meta.env.VITE_VERSION}
                </Code>
            );
        }
    };

    return <div>{development()}</div>;
}
