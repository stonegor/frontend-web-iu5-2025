import { type FC } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES, ROUTE_LABELS } from '../routes';
import type { AppDispatch, RootState } from '../store';
import { logoutUserAsync } from '../slices/userSlice';
import { setFilterAction, getAuthorsList } from '../slices/authorsSlice';
import './Navbar.css';

const AppNavbar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, username } = useSelector((state: RootState) => state.user);

  const handleExit = async () => {
    await dispatch(logoutUserAsync());
    dispatch(setFilterAction(''));
    navigate(ROUTES.AUTHORS);
    await dispatch(getAuthorsList());
  };

  return (
    <Navbar className="custom-navbar">
      <Nav className="custom-nav w-100 justify-content-between align-items-center">
        <div className="d-flex align-items-center">
            <Nav.Link as={Link} to={ROUTES.AUTHORS} className="custom-nav-link">
            {ROUTE_LABELS.AUTHORS}
            </Nav.Link>
            {isAuthenticated && (
                <Nav.Link as={Link} to="#" className="custom-nav-link">
                    {username}
                </Nav.Link>
            )}
        </div>
        <div className="ms-3">
            {!isAuthenticated ? (
            <Link to={ROUTES.LOGIN}>
                <Button variant="primary" className="login-btn">Войти</Button>
            </Link>
            ) : (
            <Button variant="primary" className="login-btn" onClick={handleExit}>
                Выйти
            </Button>
            )}
        </div>
      </Nav>
    </Navbar>
  );
};

export default AppNavbar;
