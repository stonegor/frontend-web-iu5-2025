import { type FC } from "react";
import { Link } from "react-router-dom";
import { type Author } from "../api/types";
import { Plus } from "lucide-react";
import defaultAuthor from "/AuthorPlaceholder.png";
import { showPrediction } from "../config";

interface AuthorCardProps {
  author: Author;
}

export const AuthorCard: FC<AuthorCardProps> = ({ author }) => {
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
          {showPrediction && (
            <form method="post" action="">
              <button className="add-button" type="submit">
                Добавить <Plus strokeWidth={2} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};