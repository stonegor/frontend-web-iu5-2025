import { type FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getPrediction, deletePrediction, updatePrediction } from "../slices/predictionsSlice";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ROUTE_LABELS, ROUTES } from "../routes";
import { UserSearch, Save, Trash2 } from "lucide-react";
import { Form, Button, Alert } from "react-bootstrap";
import { AuthorCard } from "../components/AuthorCard";
import type { Author } from "../api/Api";

export const PredictionPage: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { authors, predictionData, isDraft, error } = useSelector((state: RootState) => state.predictions);
  
  const [corpus, setCorpus] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getPrediction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (predictionData.corpus) {
      setCorpus(predictionData.corpus);
    }
  }, [predictionData]);

  const handleDelete = async () => {
    if (id) {
      await dispatch(deletePrediction(id));
      navigate(ROUTES.AUTHORS);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
       await dispatch(updatePrediction({ id, data: { corpus } }));
    }
  };

  if (!id) return <div>No ID provided</div>;

  return (
    <div className="prediction-detail-container">
       <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.PREDICTION }]} />
       
       <div className="container-2 mt-4">
           {error && <Alert variant="danger">{error}</Alert>}
           
           <div className="d-flex justify-content-between align-items-center mb-4">
               <h1><UserSearch /> Предсказание {id}</h1>
               {isDraft && (
                   <Button variant="danger" onClick={handleDelete} className="d-flex align-items-center gap-2">
                       Очистить <Trash2 size={16} />
                   </Button>
               )}
           </div>

           {/* Prediction Data Form */}
           <Form onSubmit={handleSave} className="mb-4">
               <Form.Group className="mb-3">
                   <Form.Label>Корпус текстов</Form.Label>
                   <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={corpus} 
                        onChange={(e) => setCorpus(e.target.value)}
                        disabled={!isDraft}
                   />
               </Form.Group>
               {isDraft && (
                   <Button type="submit" variant="primary" className="d-flex align-items-center gap-2">
                       Сохранить <Save size={16} />
                   </Button>
               )}
           </Form>

           {/* Authors List */}
           <h2>Выбранные авторы</h2>
           <div className="cards-grid">
               {authors.length > 0 ? (
                   authors.map((item, index) => (
                       <AuthorCard 
                            key={(item.author as Author).id || index} 
                            author={item.author as Author} 
                            isDraft={isDraft}
                            predictionId={Number(id)}
                       />
                   ))
               ) : (
                   <p>Нет выбранных авторов.</p>
               )}
           </div>
       </div>
    </div>
  );
};
