import { Outlet } from 'react-router-dom';
import TheHeader from '../../components/layouts/TheHeader';
import TheModal from "../../components/layouts/TheModal";

export function MainLayout() {
    return (
        <main className="d-flex flex-column h-100">
            <TheHeader />
            <div className="container-fluid h-100 overflow-hidden">
                <Outlet />
            </div>
            <TheModal/>
        </main>
    );
}

