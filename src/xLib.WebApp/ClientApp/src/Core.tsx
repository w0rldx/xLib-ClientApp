import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SidePanel from './components/SidePanel';
import SiteLayout from './components/SiteLayout';
import TopBar from './components/TopBar';
import Home from './pages/Home';

const Core = () => {
    return (
        <SiteLayout topBar={<TopBar />} sidePanel={<SidePanel />}>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </SiteLayout>
    );
};

export default Core;
