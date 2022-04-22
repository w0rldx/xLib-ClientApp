import React from 'react';
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
    return (
        <QueryClientProvider client={queryClient}>
            <SiteLayout topBar={<TopBar />} sidePanel={<SidePanel />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/books" element={<BookPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
                <ReactQueryDevtools />
            </SiteLayout>
        </QueryClientProvider>
    );
};

export default Core;
