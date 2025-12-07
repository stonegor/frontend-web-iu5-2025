import { type FC, useEffect } from "react";
import { Table, Spinner, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ROUTES, ROUTE_LABELS } from "../routes";
import { getPredictionsList } from "../slices/predictionsSlice";
import type { AppDispatch, RootState } from "../store";
import { FileText } from "lucide-react";

export const PredictionsListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { predictionsList, error } = useSelector((state: RootState) => state.predictions);
  const loading = false; // Add loading state to slice if needed, for now assume fast or handled by parent

  useEffect(() => {
    dispatch(getPredictionsList());
  }, [dispatch]);

  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case "DRAFT":
        return <Badge bg="secondary">Черновик</Badge>;
      case "FORMED":
        return <Badge bg="primary">Сформировано</Badge>;
      case "COMPLETED":
        return <Badge bg="success">Завершено</Badge>;
      case "REJECTED":
        return <Badge bg="danger">Отклонено</Badge>;
      case "DELETED":
        return <Badge bg="dark">Удалено</Badge>;
      default:
        return <Badge bg="light" text="dark">{status}</Badge>;
    }
  };

  return (
    <div className="container mt-4">
      <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.PREDICTIONS }]} />

      <h1 className="page-title mb-4">
        <FileText strokeWidth={3} className="me-2" />
        <span>Мои предсказания</span>
      </h1>

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
              <th>Статус</th>
              <th>Текст (корпус)</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {predictionsList.length > 0 ? (
              predictionsList.map((prediction: any, index) => (
                <tr key={prediction.id || index}>
                  <td>{prediction.id}</td>
                  <td>{getStatusBadge(prediction.status)}</td>
                  <td>
                    {prediction.corpus
                      ? (prediction.corpus.length > 50 ? `${prediction.corpus.substring(0, 50)}...` : prediction.corpus)
                      : <span className="text-muted">Нет данных</span>
                    }
                  </td>
                  <td>
                    <Link to={`${ROUTES.PREDICTION}/${prediction.id}`} className="btn btn-sm btn-outline-primary">
                      Просмотр
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  У вас пока нет заявок.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};
