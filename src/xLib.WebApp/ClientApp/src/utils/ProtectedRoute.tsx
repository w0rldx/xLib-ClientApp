import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

type Props = {
    children: JSX.Element;
};

function ProtectedRoute({ children }: Props) {
    const { token, user } = useContext(AuthContext);
    const location = useLocation();

    if (token === null || user === null) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;
