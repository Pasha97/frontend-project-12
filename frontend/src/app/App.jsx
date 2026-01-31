import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/home/HomePage';
import { LoginPage } from '../pages/login/LoginPage';
import { NotFoundPage } from '../pages/notFound/NotFoundPage';
import { PrivateRoute } from './PrivateRoute';
import { MainLayout } from "./layouts/MainLayout";

export function App() {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>}/>
                <Route path="/login" element={<LoginPage/>}/>

                <Route path="/404" element={<NotFoundPage/>}/>
                <Route path="*" element={<Navigate to="/404" replace/>}/>
            </Route>
        </Routes>
    );
}