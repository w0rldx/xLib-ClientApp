import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';
import { SidePanel } from './components/SidePanel';
import SiteLayout from './components/SiteLayout';
import { TopBar } from './components/TopBar';
import Home from './pages/Home';
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
                        <SiteLayout sidePanel={<SidePanel />} topBar={<TopBar />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                            </Routes>
                        </SiteLayout>
                        <ReactQueryDevtools />
                    </MantineProvider>
                </ColorSchemeProvider>
            </QueryClientProvider>
        </div>
    );
}

export default App;
