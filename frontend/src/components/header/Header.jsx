import { Button, Navbar } from "react-bootstrap";
import { isAuthenticated, removeToken } from "../../services/storage/auth";
import { useNavigate } from "react-router-dom";

export function Header() {
    const navigate = useNavigate();

    const handleClickLogout = () => {
        removeToken();
        navigate('/login/', { replace: true });
    }

    return (
        <Navbar className="shadow-sm" bg="white" expand="lg">
            <div className="container">
                <Navbar.Brand href="#">Chat</Navbar.Brand>

                { isAuthenticated() && <Button onClick={handleClickLogout}>
                    Выйти
                </Button> }
            </div>
        </Navbar>
    );
}
