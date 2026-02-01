import { Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout, IsAuthenticated } from '../../store/auth';
import { useDispatch, useSelector } from "react-redux";

export function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const IsAuth = useSelector(IsAuthenticated);

    const handleClickLogout = () => {
        dispatch(logout());
        navigate('/login/', { replace: true });
    }

    return (
        <Navbar className="shadow-sm" bg="white" expand="lg">
            <div className="container">
                <Navbar.Brand href="#">Chat</Navbar.Brand>

                { IsAuth && <Button onClick={handleClickLogout}>
                    Выйти
                </Button> }
            </div>
        </Navbar>
    );
}
