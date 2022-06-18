/* eslint-disable import/no-named-as-default-member */
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthContext from '../context/AuthContext';
import { IUser } from '../interfaces/user';
import '../scss/Index.scss';
import UserService from '../services/UserService';
import LocalStorageHelper from '../utils/LocalStorageHelper';

type Props = {
    children: JSX.Element | JSX.Element[];
};

function AppProvider({ children }: Props) {
    const queryClient = new QueryClient();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

    useEffect(() => {
        const darkModeLocalStorage = LocalStorageHelper.getDarkModeLocalStorage();
        if (darkModeLocalStorage === 'dark') {
            setColorScheme('dark');
        }

        const tokenLocalStorage = LocalStorageHelper.getTokenLocalStorage();
        if (tokenLocalStorage !== null) {
            setToken(tokenLocalStorage);
        }

        if (tokenLocalStorage !== null) {
            const fetchUser = async () => {
                console.log('fetchUser');
                try {
                    const userFetchData: IUser = await UserService.getUserData(tokenLocalStorage);
                    const staySignInLocalStorage = LocalStorageHelper.getStaySignedInLocalStorage();
                    if (userFetchData && staySignInLocalStorage === 'true') {
                        setUser(userFetchData);
                        LocalStorageHelper.setUserLocalStorage(userFetchData);
                    } else {
                        LocalStorageHelper.clearUserLocalStorage();
                        LocalStorageHelper.clearTokenLocalStorage();
                        LocalStorageHelper.setStaySignedInLocalStorage(false);
                    }
                } catch (error) {
                    LocalStorageHelper.clearUserLocalStorage();
                    LocalStorageHelper.clearTokenLocalStorage();
                    LocalStorageHelper.setStaySignedInLocalStorage(false);
                }
            };
            fetchUser();
        }
    }, []);

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser }}>
            <QueryClientProvider client={queryClient}>
                <ColorSchemeProvider
                    colorScheme={colorScheme}
                    toggleColorScheme={toggleColorScheme}
                >
                    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                        <NotificationsProvider>{children}</NotificationsProvider>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </MantineProvider>
                </ColorSchemeProvider>
            </QueryClientProvider>
        </AuthContext.Provider>
    );
}

export default AppProvider;
