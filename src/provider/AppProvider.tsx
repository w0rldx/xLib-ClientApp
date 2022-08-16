import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core';
import {
    NotificationsProvider,
    showNotification,
} from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
import { BiErrorAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import '../scss/Index.scss';
import IdentityService from '../services/IdentityService';
import { useAuthStore } from '../stores/AuthStore';
import LocalStorageHelper from '../utils/LocalStorageHelper';

type Props = {
    children: JSX.Element | JSX.Element[];
};

function AppProvider({ children }: Props) {
    const queryClient = new QueryClient();
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const navigate = useNavigate();
    const [setUser, getUser, setToken, getToken, clearToken, clearUser] =
        useAuthStore((s) => [
            s.setUser,
            s.getUser,
            s.setToken,
            s.getToken,
            s.clearToken,
            s.clearUser,
        ]);

    useEffect(() => {
        setCachedValuesInGlobalState();
        checkForValidCachedToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function setCachedValuesInGlobalState() {
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
    }

    async function checkForValidCachedToken() {
        const currentCachedToken = getToken();
        if (currentCachedToken) {
            try {
                const isValid = await IdentityService.getUserData(
                    currentCachedToken,
                );
                if (!isValid) {
                    clearToken();
                    clearUser();
                    navigate('/login');
                }
            } catch (error) {
                clearToken();
                clearUser();
                navigate('/login');
                showErrorNotification(error.message);
            }
        } else {
            clearToken();
            clearUser();
            navigate('/login');
        }
    }

    function showErrorNotification(errorMessage: string) {
        showNotification({
            title: 'Error',
            message: errorMessage,
            color: 'red',
            icon: <BiErrorAlt />,
            radius: 'md',
            autoClose: 2500,
        });
    }

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
