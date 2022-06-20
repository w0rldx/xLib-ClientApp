import { Code } from '@mantine/core';

export function VersionContainer() {
    return (
        <div>
            <Code sx={{ fontWeight: 700 }}>{process.env.VERSION}</Code>
        </div>
    );
}
