import { type FC } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
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
        <div className="d-flex align-items-center gap-4">
            <Nav.Link as={Link} to={ROUTES.AUTHORS} className="custom-nav-link">
            {ROUTE_LABELS.AUTHORS}
            </Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to={ROUTES.PREDICTIONS} className="custom-nav-link">
                    {ROUTE_LABELS.PREDICTIONS}
                </Nav.Link>
                <Nav.Link as={Link} to={ROUTES.PROFILE} className="custom-nav-link">
                    {username}
                </Nav.Link>
              </>
            )}
        </div>
        <div className="ms-3 d-flex align-items-center gap-3">
            {!isAuthenticated ? (
            <Link to={ROUTES.LOGIN}>
                <button className="action-button">Войти</button>
            </Link>
            ) : (
            <button className="action-button" onClick={handleExit}>
                Выйти
            </button>
            )}
        </div>
      </Nav>
    </Navbar>
  );
};

export default AppNavbar;
