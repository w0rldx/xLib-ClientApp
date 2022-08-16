import loadable from '@loadable/component';
import React, { CSSProperties, SVGAttributes } from 'react';
import { IconContext } from 'react-icons';

interface IProps {
    icon: string;
    color?: string;
    size?: string;
    className?: string;
    style?: CSSProperties;
    attr?: SVGAttributes<SVGElement>;
}

const DynamicIcon: React.FC<IProps> = ({ ...props }) => {
    const [library, iconComponent] = props.icon.split('/');

    if (!library || !iconComponent) return <div>Could Not Find Icon</div>;

    const lib = library.toLowerCase();
    const Icon = loadable(() => import(`react-icons/${lib}/index.js`), {
        resolveComponent: (el: JSX.Element) =>
            el[iconComponent as keyof JSX.Element],
    });

    const value: IconContext = {
        color: props.color,
        size: props.size,
        className: props.className,
        style: props.style,
        attr: props.attr,
    };

    return (
        <IconContext.Provider value={value}>
            <Icon />
        </IconContext.Provider>
    );
};

export default DynamicIcon;
