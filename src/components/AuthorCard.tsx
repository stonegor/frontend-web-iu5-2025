import type { FC } from "react";
import { Link } from "react-router-dom";
import type { Author } from "../api/types";

interface AuthorCardProps {
  author: Author;
}

export const AuthorCard: FC<AuthorCardProps> = ({ author }) => {
  return (
    <div className="nutrient is-promoted card usa-card__container clearfix">
      <Link to={`/author/${author.id}`} rel="bookmark">
        <div className="usa-card__media">
          <img
            src={author.image_url}
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
          <form method="post" action="">
            <button className="add-button" type="submit">
              Добавить{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};