/* eslint-disable import/no-named-as-default-member */
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import AuthContext from './context/AuthContext';
import { ITokenResponse, IUser } from './interfaces/user';
import Home from './pages/Home';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Register from './pages/Register';
import './scss/Index.scss';
import ProtectedRoute from './utils/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
    const [token, setToken] = useState<ITokenResponse | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <>
            <div className="App">
                <AuthContext.Provider value={{ token, setToken, user, setUser }}>
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
                                            <Route
                                                index
                                                element={
                                                    <ProtectedRoute>
                                                        <Home />
                                                    </ProtectedRoute>
                                                }
                                            />
                                            <Route
                                                path="*"
                                                element={
                                                    <ProtectedRoute>
                                                        <NoPage />
                                                    </ProtectedRoute>
                                                }
                                            />
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
