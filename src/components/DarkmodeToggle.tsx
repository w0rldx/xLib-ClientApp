import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { BsMoonStars, BsSun } from 'react-icons/bs';

import LocalStorageHelper from '../utils/LocalStorageHelper';

function DarkModeToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    const changeColorScheme = () => {
        toggleColorScheme();
        LocalStorageHelper.setDarkModeLocalStorage(colorScheme);
    };

    return (
        <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => changeColorScheme()}
            title="Toggle color scheme"
        >
            {dark ? <BsSun size={18} /> : <BsMoonStars size={18} />}
        </ActionIcon>
    );
}

export default DarkModeToggle;
