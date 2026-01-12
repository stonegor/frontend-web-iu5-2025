import { type FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import {
  setAuthorPredictionDetails,
  removeAuthorFromState,
  updateAuthorStageInState,
  updateAuthorPredictionStatusInState,
  setAuthorPredictionData,
  resetAuthorPredictionState,
  setError
} from "../slices/authorPredictionsSlice";
import { api } from "../api";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ROUTE_LABELS, ROUTES } from "../routes";
import { UserSearch, Save } from "lucide-react";
import { AuthorCard } from "../components/AuthorCard";
import type { Author } from "../api/Api";
import { StatusBadge } from "../components/StatusBadge";

export const AuthorPredictionPage: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { authors, authorPredictionData, isDraft } = useSelector((state: RootState) => state.authorPredictions);

  const [corpus, setCorpus] = useState("");

  const fetchAuthorPrediction = async (authorPredictionId: string) => {
    try {
      const response = await api.authorPredictions.authorPredictionsRead(authorPredictionId);
      dispatch(setAuthorPredictionDetails(response.data));
    } catch (error) {
      dispatch(setError("Ошибка при загрузке предсказания"));
      console.error(error);
    }
  };

  useEffect(() => {
    if (id && id !== 'undefined') {
      fetchAuthorPrediction(id);
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (authorPredictionData.corpus) {
      setCorpus(authorPredictionData.corpus);
    }
  }, [authorPredictionData]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        await api.authorPredictions.authorPredictionsDelete(id);
        dispatch(resetAuthorPredictionState());
        navigate(ROUTES.AUTHORS);
      } catch (error) {
        dispatch(setError("Ошибка при удалении предсказания"));
      }
    }
  };

  const handleSave = async () => {
    if (id) {
      try {
        const response = await api.authorPredictions.authorPredictionsUpdate(id, { corpus });
        dispatch(setAuthorPredictionData({ corpus: response.data.corpus }));
      } catch (error) {
        dispatch(setError("Ошибка при обновлении предсказания"));
      }
    }
  };

  const handleSaveCorpus = async (e: React.MouseEvent) => {
    e.preventDefault();
    await handleSave();
  };

  const handleSubmitAuthorPrediction = async () => {
    if (id) {
      try {
        await api.authorPredictions.authorPredictionsSubmitUpdate(id);
        dispatch(updateAuthorPredictionStatusInState());
        navigate(ROUTES.AUTHOR_PREDICTIONS); // Redirect to list after submit
      } catch (err) {
        dispatch(setError("Ошибка при подтверждении предсказания"));
        console.error("Failed to submit prediction:", err);
      }
    }
  };

  const handleDeleteAuthor = async (authorId: number) => {
    if (id && authorId) {
      try {
        await api.authorPredictions.authorPredictionsAuthorDelete(id, String(authorId));
        dispatch(removeAuthorFromState(String(authorId)));
      } catch (error) {
        dispatch(setError("Ошибка при удалении автора"));
      }
    }
  };

  const handleUpdateStage = async (authorId: number, stage: string) => {
    if (id && authorId) {
      try {
        const response = await api.authorPredictions.authorPredictionsAuthorStageUpdate(id, String(authorId), { stage });
        dispatch(updateAuthorStageInState({ authorId: String(authorId), stage: response.data.stage }));
      } catch (error) {
        dispatch(setError("Ошибка при обновлении стадии"));
      }
    }
  };

  if (!id || id === 'undefined' || id === 'null') return <div className="alert alert-warning">ID не найден или некорректен.</div>;

  return (
    <div className="author-prediction-detail-container">
      <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.AUTHOR_PREDICTION }]} />
      <h1 className="page-title">
        <div className="d-flex align-items-center gap-3">
          <UserSearch strokeWidth={3} />
          <span>Предсказание</span>
          {!isDraft && <StatusBadge status={authorPredictionData.status} />}
        </div>
      </h1>

      <div className="search-and-summary">
        <form className="search-form author-prediction-form">
          <textarea
            name="author_name"
            placeholder="Введите текст для анализа"
            value={corpus}
            onChange={(e) => setCorpus(e.target.value)}
            // onBlur={handleSave}
            disabled={!isDraft}
          ></textarea>
          {isDraft && (
            <div className="mt-2 d-flex justify-content-end">
              <button
                className="action-button d-flex align-items-center gap-2"
                onClick={handleSaveCorpus}
              >
                <Save size={16} /> Сохранить текст
              </button>
            </div>
          )}
        </form>
      </div>

      <h2 className="authors-list-header">Результаты</h2>

      <div className="results-cards">
        {authors.length > 0 ? (
          authors.map((item, index) => (
            <AuthorCard
              key={(item.author as any).id || index}
              author={item.author as Author}
              isDraft={isDraft}
              predictionId={Number(id)}
              stage={item.stage}
              probability={item.probability}
              onDeleteAuthor={(item.author as any)?.id ? () => handleDeleteAuthor((item.author as any).id!) : undefined}
              onUpdateStage={(item.author as any)?.id ? (stage) => handleUpdateStage((item.author as any).id!, stage) : undefined}
            />
          ))
        ) : (
          <p>Нет выбранных авторов.</p>
        )}
      </div>

      {isDraft && (
        <div className="d-flex justify-content-between mt-3">
          <button className="action-button" onClick={handleDelete}>
            Удалить
          </button>
          <button className="action-button" onClick={handleSubmitAuthorPrediction}>
            Подтвердить
          </button>
        </div>
      )}
    </div>
  );
};