import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';
import SidePanel from './components/SidePanel';
import SiteLayout from './components/SiteLayout';
import TopBar from './components/TopBar';
import BookPage from './pages/BookPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

const queryClient = new QueryClient();

const Core = () => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <QueryClientProvider client={queryClient}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{ colorScheme }}>
                    <NotificationsProvider>
                        <SiteLayout topBar={<TopBar />} sidePanel={<SidePanel />}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/books" element={<BookPage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                            </Routes>
                            <ReactQueryDevtools />
                        </SiteLayout>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </QueryClientProvider>
    );
};

export default Core;
