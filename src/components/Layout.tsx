import { FC } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

const Layout: FC = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">AuthorSearch</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/authors">Authors</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default Layout;
