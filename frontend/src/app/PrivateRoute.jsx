import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/storage/auth';

export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
