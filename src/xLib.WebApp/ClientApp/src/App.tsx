/* eslint-disable import/no-named-as-default-member */
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import AuthContext from './context/AuthContext';
import { IUserResponse } from './interfaces/user';
import Home from './pages/Home';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Register from './pages/Register';
import './scss/Index.scss';

const queryClient = new QueryClient();

function App() {
    const [user, setUser] = useState<IUserResponse | null>(null);
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <>
            <div className="App">
                <AuthContext.Provider value={{ user, setUser }}>
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
                                <NotificationsProvider>
                                    <Routes>
                                        <Route path="/register" element={<Register />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/" element={<SiteLayout />}>
                                            <Route index element={<Home />} />
                                            <Route path="*" element={<NoPage />} />
                                        </Route>
                                    </Routes>
                                </NotificationsProvider>

                                <ReactQueryDevtools initialIsOpen={false} />
                            </MantineProvider>
                        </ColorSchemeProvider>
                    </QueryClientProvider>
                </AuthContext.Provider>
            </div>
        </>
    );
}

export default App;
