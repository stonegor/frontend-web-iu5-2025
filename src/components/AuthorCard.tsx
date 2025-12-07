import { type FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { type Author } from "../api/Api";
import { Plus, Trash2 } from "lucide-react";
import defaultAuthor from "/AuthorPlaceholder.png";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { addAuthorToPrediction, deleteAuthorFromPrediction } from "../slices/predictionsSlice";
import { getAuthorsList } from "../slices/authorsSlice";
import { Button } from "react-bootstrap";
import { ROUTES } from "../routes";

interface AuthorCardProps {
  author: Author;
  predictionId?: number; // For deletion context
  isDraft?: boolean;
}

export const AuthorCard: FC<AuthorCardProps> = ({ author, predictionId, isDraft }) => {
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

  // Prediction Page View - Compact or different style if needed, but keeping consistent for now
  if (isPredictionPage) {
       return (
           <div className="nutrient is-promoted card usa-card__container clearfix">
               <div className="usa-card__media">
                 <img src={author.image_url || defaultAuthor} alt={author.name} className="card-image" />
               </div>
               <div className="card-content">
                    <h2 className="card-title usa-card__heading">{author.name}</h2>
                    <div className="card-footer">
                        <div className="stats-grid">
                            <div className="column">
                            <p>в: {author.count_v}</p>
                            <p>и: {author.count_i}</p>
                            <p>но: {author.count_no}</p>
                            </div>
                        </div>
                        {isDraft && (
                            <Button variant="danger" onClick={handleDelete} className="w-100 mt-2 d-flex align-items-center justify-content-center gap-2">
                                Удалить <Trash2 size={16} />
                            </Button>
                        )}
                    </div>
               </div>
           </div>
       );
  }

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
