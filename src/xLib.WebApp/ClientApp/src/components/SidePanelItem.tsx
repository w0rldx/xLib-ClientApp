import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SidePanelItem.scss';

interface Props {
    label: string;
    icon?: JSX.Element | undefined;
    link: string;
}

function SidePanelItem(prop: Props) {
    return (
        <div>
            <Link key={prop.link} to={prop.link}>
                <div className="container">
                    <div className="link-icon">{prop.icon}</div>
                    <div className="link-text">{prop.label}</div>
                </div>
            </Link>
        </div>
    );
}

export default SidePanelItem;
