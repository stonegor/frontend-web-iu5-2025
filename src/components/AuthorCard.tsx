import { type FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { type Author } from "../api/Api";
import { Plus, X } from "lucide-react";
import defaultAuthor from "/AuthorPlaceholder.png";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { addAuthorToPrediction, deleteAuthorFromPrediction, updateAuthorStage } from "../slices/predictionsSlice";
import { getAuthorsList } from "../slices/authorsSlice";
import { Button } from "react-bootstrap";
import { ROUTES } from "../routes";

interface AuthorCardProps {
  author: Author;
  predictionId?: number;
  isDraft?: boolean;
  stage?: string;
  probability?: number;
}

export const AuthorCard: FC<AuthorCardProps> = ({ author, predictionId, isDraft, stage, probability }) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const isPredictionPage = location.pathname.includes(ROUTES.PREDICTION);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (author.id) {
      await dispatch(addAuthorToPrediction(author.id));
      await dispatch(getAuthorsList());
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (author.id && predictionId) {
      await dispatch(deleteAuthorFromPrediction({ predictionId: String(predictionId), authorId: String(author.id) }));
    }
  };

  const handleStageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (author.id && predictionId) {
       await dispatch(updateAuthorStage({ predictionId: String(predictionId), authorId: String(author.id), stage: e.target.value }));
    }
  };

  // Prediction Page View (Matches original template structure)
  if (isPredictionPage) {
    return (
      <div className="card position-relative">
        <div className="card-image-container">
          <img
            src={author.image_url || defaultAuthor}
            alt={author.name}
            className="card-image"
          />
        </div>
        <div className="card-main-content">
          <h3 className="card-title">{author.name}</h3>
          <div className="card-details">
            <p className="card-stats">
              в: {author.count_v}, и: {author.count_i}, не:{" "}
              {author.count_no}, ли: {author.count_li}, да:{" "}
              {author.count_da}, же: {author.count_zhe}, или:{" "}
              {author.count_ili}, либо: {author.count_libo}
            </p>
            <div className="dropdown">
              <label htmlFor={`period-${author.id}`}>Период:</label>
              <select
                name="period"
                id={`period-${author.id}`}
                defaultValue={stage?.toLowerCase() || "early"}
                onChange={handleStageChange}
                disabled={!isDraft}
              >
                <option value="early">Ранний</option>
                <option value="mature">Зрелый</option>
                <option value="late">Поздний</option>
              </select>
            </div>
            {probability !== undefined && (
              <div className="probability-display">Вероятность: {probability.toFixed(2)}</div>
            )}
          </div>
        </div>
        {isDraft && (
          <Button
            variant="link"
            className="position-absolute top-0 end-0 p-2 text-secondary"
            style={{ color: '#aaa', textDecoration: 'none' }}
            onClick={handleDelete}
          >
            <X size={18} />
          </Button>
        )}
      </div>
    );
  }

  // Default View (Authors List)
  return (
    <div className="nutrient is-promoted card usa-card__container clearfix">
      <Link to={`/author/${author.id}`} rel="bookmark">
        <div className="usa-card__media">
          <img
            src={author.image_url || defaultAuthor}
            alt={author.name}
            className="card-image"
          />
        </div>
      </Link>
      <div className="card-content">
        <h2 className="card-title usa-card__heading">{author.name}</h2>
        <p className="card-subtitle">В среднем на 100 слов:</p>
        <div className="card-footer">
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
          {isAuthenticated && (
            <div className="mt-2">
              <Button className="add-button w-100 d-flex align-items-center justify-content-center gap-2" onClick={handleAdd}>
                Добавить <Plus strokeWidth={2} size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
