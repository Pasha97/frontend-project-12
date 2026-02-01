import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/home/HomePage';
import { LoginPage } from '../pages/login/LoginPage';
import { NotFoundPage } from '../pages/notFound/NotFoundPage';
import { SignupPage } from "../pages/signup/SignupPage";
import { MainLayout } from "./layouts/MainLayout";
import { PrivateLayout } from "./layouts/PrivateLayout";
import { useDispatch } from "react-redux";
import { getToken, getUserName } from "../services/storage/auth";
import { login } from "../store/auth";

export function App() {
    const dispatch = useDispatch();

    const token = getToken();
    const user = getUserName();

    if (token) {
        dispatch(login({ user: user || 'Anonymous', token }));
    }

    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route element={<PrivateLayout/>}>
                    <Route path="/" element={<HomePage/>}/>
                </Route>

                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>

                <Route path="/404" element={<NotFoundPage/>}/>
                <Route path="*" element={<Navigate to="/404" replace/>}/>
            </Route>
        </Routes>
    );
}