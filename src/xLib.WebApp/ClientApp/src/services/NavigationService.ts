import { getNavigationData } from '../data/NavigationData';

const getNavigation = () => {
    return getNavigationData();
};

const NavigationService = {
    getNavigation,
};

export default NavigationService;
