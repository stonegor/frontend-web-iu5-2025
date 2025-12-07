import { type FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getPrediction, deletePrediction, updatePrediction } from "../slices/predictionsSlice";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ROUTE_LABELS, ROUTES } from "../routes";
import { UserSearch } from "lucide-react";
import { AuthorCard } from "../components/AuthorCard";
import type { Author } from "../api/Api";

export const PredictionPage: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { authors, predictionData, isDraft } = useSelector((state: RootState) => state.predictions);

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

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await dispatch(deletePrediction(id));
      navigate(ROUTES.AUTHORS);
    }
  };

  const handleSave = async () => {
    if (id) {
      await dispatch(updatePrediction({ id, data: { corpus } }));
    }
  };

  // Debounced save or manual save? The original template didn't have a save button for text, 
  // but let's assume blur or manual save.
  // The walkthrough has a "Save" button for vacancy fields.
  // I will add a save button if it's draft, or just save on blur.
  // For now, let's just update state.

  if (!id) return <div>No ID provided</div>;

  return (
    <div className="prediction-detail-container">
      <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.PREDICTION }]} />
      <h1 className="page-title">
        <UserSearch strokeWidth={3} />
        <span>Поиск Автора по тексту</span>
      </h1>

      <div className="search-and-summary">
        <form className="search-form prediction-form">
          <textarea
            name="author_name"
            placeholder="Введите текст для анализа"
            value={corpus}
            onChange={(e) => setCorpus(e.target.value)}
            onBlur={handleSave}
            disabled={!isDraft}
          ></textarea>
        </form>
      </div>

      <h2 className="authors-list-header">Результаты</h2>
      <div className="results-cards">
        {authors.length > 0 ? (
          authors.map((item, index) => (
            <AuthorCard
              key={(item.author as Author).id || index}
              author={item.author as Author}
              isDraft={isDraft}
              predictionId={Number(id)}
              stage={item.stage}
              probability={item.probability}
            />
          ))
        ) : (
          <p>Нет выбранных авторов.</p>
        )}
      </div>

      {isDraft && (
        <form onSubmit={handleDelete} className="d-flex justify-content-end mt-3">
          <button type="submit" className="delete-button">
            Удалить
          </button>
        </form>
      )}
    </div>
  );
};