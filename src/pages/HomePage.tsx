import type { FC } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <h1>Author Search</h1>
          <p>
            Welcome to Author Search! Here you can find information about your favorite authors.
          </p>
          <Link to="/authors">
            <Button variant="primary">Browse Authors</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;