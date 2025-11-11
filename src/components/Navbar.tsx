import { type FC } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../routes';
import './Navbar.css';

const AppNavbar: FC = () => {
  return (
    <Navbar className="custom-navbar">
      <Nav className="custom-nav">
        <Nav.Link as={Link} to={ROUTES.AUTHORS} className="custom-nav-link">
          {ROUTE_LABELS.AUTHORS}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default AppNavbar;
