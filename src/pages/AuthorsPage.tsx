import { type FC, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuthors } from '../api/authors';
import { type Author } from '../api/types';
import AuthorCard from '../components/AuthorCard';
import Breadcrumbs from '../components/Breadcrumbs';
import predictionStore from '../store/prediction';

const AuthorsPage: FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [predictionCount, setPredictionCount] = useState(predictionStore.getAuthorsCount());

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        const data = await getAuthors(search);
        setAuthors(data);
      } catch (err) {
        setError('Failed to fetch authors');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, [search]);

  const handleAuthorAdded = () => {
    setPredictionCount(predictionStore.getAuthorsCount());
  };

  useEffect(() => {
    // A bit of a hack to re-render when the store changes.
    // In a real app, we'd use a proper state management library.
    const interval = setInterval(() => {
      if (predictionCount !== predictionStore.getAuthorsCount()) {
        handleAuthorAdded();
      }
    }, 200);
    return () => clearInterval(interval);
  }, [predictionCount]);

  return (
    <Container className="mt-5">
      <Breadcrumbs />
      <h1>Authors</h1>
      <Form.Control
        type="text"
        placeholder="Search for an author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <Row>
          {authors.map((author) => (
            <Col key={author.id} sm={12} md={6} lg={4}>
              <AuthorCard author={author} />
            </Col>
          ))}
        </Row>
      )}
      {predictionCount > 0 && (
        <Link to="/prediction">
          <Button
            variant="primary"
            className="position-fixed bottom-0 end-0 m-3"
            style={{ zIndex: 1050 }}
          >
            Выбрано авторов: {predictionCount}
          </Button>
        </Link>
      )}
    </Container>
  );
};

export default AuthorsPage;