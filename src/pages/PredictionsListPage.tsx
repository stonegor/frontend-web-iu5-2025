import { type FC, useEffect, useState } from "react";
import { Table, Spinner, Form, Button, Row, Col, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ROUTES, ROUTE_LABELS } from "../routes";
import { getPredictionsList, completePrediction } from "../slices/predictionsSlice";
import type { AppDispatch, RootState } from "../store";
import { FileText, Check, X } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";

export const PredictionsListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { predictionsList, error } = useSelector((state: RootState) => state.predictions);
  const { isStaff } = useSelector((state: RootState) => state.user);
  const loading = false; 

  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [creatorFilter, setCreatorFilter] = useState("");

  const fetchPredictions = () => {
    dispatch(getPredictionsList({
      status: statusFilter || undefined,
      start_date: startDate || undefined,
      end_date: endDate || undefined
    }));
  };

  useEffect(() => {
    fetchPredictions();
    const interval = setInterval(fetchPredictions, 2000);
    return () => clearInterval(interval);
  }, [dispatch, statusFilter, startDate, endDate]);

  const handleAction = (id: number, action: 'complete' | 'reject') => {
      dispatch(completePrediction({ id: String(id), action }));
  };

  const displayedPredictions = predictionsList.filter(p => {
      if (!creatorFilter) return true;
      return p.client_email?.toLowerCase().includes(creatorFilter.toLowerCase());
  });

  return (
    <div className="container mt-4">
      <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.PREDICTIONS }]} />

      <h1 className="page-title mb-4">
        <FileText strokeWidth={3} className="me-2" />
        <span>{isStaff ? "Управление предсказаниями" : "Мои предсказания"}</span>
      </h1>

      {/* Filters */}
      <div className="card p-3 mb-4">
          <Row className="g-3">
              <Col md={3}>
                  <Form.Group>
                      <Form.Label>Статус</Form.Label>
                      <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                          <option value="">Все</option>
                          <option value="DRAFT">Черновик</option>
                          <option value="FORMED">Сформирован</option>
                          <option value="COMPLETED">Завершен</option>
                          <option value="REJECTED">Отклонен</option>
                      </Form.Select>
                  </Form.Group>
              </Col>
              <Col md={3}>
                  <Form.Group>
                      <Form.Label>Дата начала</Form.Label>
                      <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </Form.Group>
              </Col>
              <Col md={3}>
                  <Form.Group>
                      <Form.Label>Дата окончания</Form.Label>
                      <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </Form.Group>
              </Col>
               <Col md={3}>
                  <Form.Group>
                      <Form.Label>Email создателя</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Фильтр по email" 
                        value={creatorFilter} 
                        onChange={(e) => setCreatorFilter(e.target.value)} 
                      />
                  </Form.Group>
              </Col>
          </Row>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Статус</th>
              <th>Рассчитано</th>
              <th>Текст (корпус)</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {displayedPredictions.length > 0 ? (
              displayedPredictions.map((prediction, index) => (
                <tr key={prediction.id || index}>
                  <td>{prediction.id}</td>
                  <td>{prediction.client_email}</td>
                  <td><StatusBadge status={prediction.status} /></td>
                  <td>{prediction.calculated_candidates_count ?? 0}</td>
                  <td>
                    {prediction.corpus
                      ? (prediction.corpus.length > 50 ? `${prediction.corpus.substring(0, 50)}...` : prediction.corpus)
                      : <span className="text-muted">Нет данных</span>
                    }
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                        {prediction.id ? (
                        <Link to={`${ROUTES.PREDICTION}/${prediction.id}`} className="small-action-button">
                            Просмотр
                        </Link>
                        ) : null}
                        
                        {isStaff && prediction.status === 'FORMED' && prediction.id && (
                            <>
                                <Button 
                                    variant="success" 
                                    size="sm" 
                                    onClick={() => handleAction(prediction.id!, 'complete')}
                                    title="Завершить"
                                >
                                    <Check size={16} />
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm" 
                                    onClick={() => handleAction(prediction.id!, 'reject')}
                                    title="Отклонить"
                                >
                                    <X size={16} />
                                </Button>
                            </>
                        )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  Заявок не найдено.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};
