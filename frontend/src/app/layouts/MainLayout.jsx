import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';

export function MainLayout() {
    return (
        <main className="d-flex flex-column h-100">
            <Header />
            <div className="container-fluid h-100 overflow-hidden">
                <Outlet />
            </div>
        </main>
    );
}

