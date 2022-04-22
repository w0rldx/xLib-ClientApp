import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';

function HomePage() {
    return (
        <div>
            <Button>Home Site!</Button>
            <Button
                variant="outline"
                onClick={() =>
                    showNotification({
                        title: 'Default notification',
                        message: 'Hey there, your code is awesome! 🤥',
                    })
                }
            >
                Notification Test
            </Button>
        </div>
    );
}

export default HomePage;
