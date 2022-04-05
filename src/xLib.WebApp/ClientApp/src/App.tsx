import 'antd/dist/antd.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Core from './Core';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Core />
        </BrowserRouter>
    </React.StrictMode>
);
