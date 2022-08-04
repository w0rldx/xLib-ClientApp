import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '../stores/AuthStore';

type Props = {
    children: JSX.Element;
};

function ProtectedRoute({ children }: Props) {
    const location = useLocation();
    const [getUser, getToken] = useAuthStore((s) => [s.getUser, s.getToken]);

    const currentUser = getUser();
    const currentToken = getToken();

    if (currentUser === null || currentToken === null) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;
