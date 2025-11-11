import { type FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Image } from 'react-bootstrap';
import { getAuthorById } from '../api/authors';
import { type Author } from '../api/types';
import Breadcrumbs from '../components/Breadcrumbs';

const AuthorDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getAuthorById(parseInt(id, 10));
        if (data) {
          setAuthor(data);
        } else {
          setError('Author not found');
        }
      } catch (err) {
        setError('Failed to fetch author');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!author) {
    return null;
  }

  const imageUrl = author.image_url || '/default-author.svg';

  return (
    <Container className="mt-5">
      <Breadcrumbs />
      <Row>
        <Col md={4}>
          <Image src={imageUrl} alt={author.name} fluid />
        </Col>
        <Col md={8}>
          <h1>{author.name}</h1>
          <h2>About the author</h2>
          <p>{author.about}</p>
          <h2>In an average of 100 words:</h2>
          <div className="stats-grid">
            <div className="column">
              <p>в: {author.count_v}</p>
              <p>и: {author.count_i}</p>
              <p>но: {author.count_no}</p>
              <p>ли: {author.count_li}</p>
            </div>
            <div className="column">
              <p>да: {author.count_da}</p>
              <p>же: {author.count_zhe}</p>
              <p>или: {author.count_ili}</p>
              <p>либо: {author.count_libo}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthorDetailPage;