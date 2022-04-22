import React from 'react';
import { AiOutlineBook, AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import '../styles/SidePanel.scss';
import SidePanelItem from './SidePanelItem';

const defaultLinkData = [
    { href: '/', label: 'Start', icon: <AiOutlineHome /> },
    { href: '/books', label: 'Books', icon: <AiOutlineBook /> },
    { href: '/settings', label: 'Settings', icon: <AiOutlineSetting /> },
];

function SidePanel() {
    const sidePanelItems = defaultLinkData.map((link) => (
        <SidePanelItem key={link.href} label={link.label} link={link.href} icon={link.icon} />
    ));

    return <div className="sidePanel">{sidePanelItems}</div>;
}

export default SidePanel;
