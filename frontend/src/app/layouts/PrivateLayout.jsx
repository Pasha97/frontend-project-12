import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IsAuthenticated } from "../../store/auth";

export function PrivateLayout() {
    const isAuthenticated = useSelector(IsAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}