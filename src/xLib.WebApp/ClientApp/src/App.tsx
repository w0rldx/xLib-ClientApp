import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import './scss/Index.scss';

const queryClient = new QueryClient();

function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <ColorSchemeProvider
                    colorScheme={colorScheme}
                    toggleColorScheme={toggleColorScheme}
                >
                    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                        <Routes>
                            <Route path="/" element={<SiteLayout />}>
                                <Route index element={<Home />} />
                                <Route path="*" element={<NoPage />} />
                            </Route>
                        </Routes>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </MantineProvider>
                </ColorSchemeProvider>
            </QueryClientProvider>
        </div>
    );
}

export default App;
