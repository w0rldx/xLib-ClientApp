import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../scss/Index.scss';
import { useAuthStore } from '../stores/AuthStore';
import LocalStorageHelper from '../utils/LocalStorageHelper';

type Props = {
    children: JSX.Element | JSX.Element[];
};

function AppProvider({ children }: Props) {
    const queryClient = new QueryClient();
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const [setUser, getUser, setToken, getToken] = useAuthStore((s) => [
        s.setUser,
        s.getUser,
        s.setToken,
        s.getToken,
    ]);

    useEffect(() => {
        const darkModeLocalStorage =
            LocalStorageHelper.getDarkModeLocalStorage();
        if (darkModeLocalStorage === 'dark') {
            setColorScheme('dark');
        }

        const currentUser = getUser();
        const currentToken = getToken();

        if (currentUser && currentToken) {
            setUser(currentUser);
            setToken(currentToken);
        }
        console.log('currentUser', currentUser);
    }, [getUser, getToken, setUser, setToken]);

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <QueryClientProvider client={queryClient}>
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    theme={{ colorScheme }}
                    withGlobalStyles
                    withNormalizeCSS
                >
                    <NotificationsProvider>{children}</NotificationsProvider>
                    <ReactQueryDevtools
                        initialIsOpen={false}
                        position="bottom-right"
                    />
                </MantineProvider>
            </ColorSchemeProvider>
        </QueryClientProvider>
    );
}

export default AppProvider;
