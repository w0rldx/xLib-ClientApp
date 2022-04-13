import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SiteLayout from './components/SiteLayout';
import Home from './pages/Home';

const Core = () => {
    return (
        <SiteLayout navbar={<Navbar />}>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </SiteLayout>
    );
};

export default Core;
