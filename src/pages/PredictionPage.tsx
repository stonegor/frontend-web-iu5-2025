import { type FC, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import Breadcrumbs from '../components/Breadcrumbs';
import predictionStore from '../store/prediction';
import { createPrediction, deletePrediction } from '../api/authors';
import { type Prediction } from '../api/types';

const PredictionPage: FC = () => {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authors = predictionStore.getAuthors();

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError(null);
      const authorIds = authors.map((a) => a.id);
      const result = await createPrediction(text, authorIds);
      setPrediction(result);
    } catch (err) {
      setError('Failed to create prediction');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!prediction) return;
    try {
      setLoading(true);
      setError(null);
      await deletePrediction(prediction.id);
      setPrediction(null);
      setText('');
    } catch (err) {
      setError('Failed to delete prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Breadcrumbs />
      <h1>Поиск Автора по тексту</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Введите текст для анализа"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAnalyze} disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Анализировать'}
        </Button>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {prediction && (
        <>
          <h2 className="mt-5">Результаты</h2>
          <Row>
            {prediction.authors.map((author) => (
              <Col key={author.id} sm={12} md={6} lg={4}>
                {/* This is a simplified view. The prototype has more details. */}
                <p>{author.name}</p>
              </Col>
            ))}
          </Row>
          <Button variant="danger" className="mt-3" onClick={handleDelete} disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Удалить'}
          </Button>
        </>
      )}
    </Container>
  );
};

export default PredictionPage;
