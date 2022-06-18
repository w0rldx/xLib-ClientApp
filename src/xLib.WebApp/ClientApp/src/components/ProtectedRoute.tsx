import { Navigate, useLocation } from 'react-router-dom';
import LocalStorageHelper from '../utils/LocalStorageHelper';

type Props = {
    children: JSX.Element;
};

function ProtectedRoute({ children }: Props) {
    const location = useLocation();

    let userCached = null;
    let tokenCached = null;

    const staySignInLocalStorage = LocalStorageHelper.getStaySignedInLocalStorage();

    if (staySignInLocalStorage === 'false') {
        console.log('staySignInLocalStorage === false');

        const tokenSessionStorage = sessionStorage.getItem('token');
        const userSessionStorage = sessionStorage.getItem('user');

        if (tokenSessionStorage && userSessionStorage) {
            tokenCached = tokenSessionStorage;
            userCached = JSON.parse(userSessionStorage);
        }

        if (userSessionStorage === null || tokenSessionStorage === null) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    }

    if (staySignInLocalStorage === 'true') {
        console.log('staySignInLocalStorage === true');

        const userLocalStorage = LocalStorageHelper.getUserLocalStorage();
        const tokenLocalStorage = LocalStorageHelper.getTokenLocalStorage();
        if (tokenLocalStorage && userLocalStorage) {
            tokenCached = tokenLocalStorage;
            userCached = userLocalStorage;
        }

        if (userLocalStorage === null || tokenLocalStorage === null) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    }

    if (userCached === null || tokenCached === null) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;
