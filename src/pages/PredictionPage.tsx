import { type FC } from "react";
import { UserSearch } from "lucide-react";
import { type Author } from "../api/types";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ROUTE_LABELS } from "../routes";
import defaultAuthor from "/AuthorPlaceholder.png";
import { GetData } from "../getData";
import { useAuthors } from "../slices/authorsSlice";

export const PredictionPage: FC = () => {
  GetData();
  const authors = useAuthors();

  return (
    <div className="prediction-detail-container">
      <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.PREDICTION }]} />
      <h1 className="page-title">
        <UserSearch strokeWidth={3} />
        <span>Поиск Автора по тексту</span>
      </h1>

      <div className="search-and-summary">
        <form action="" method="get" className="search-form prediction-form">
          <textarea
            name="author_name"
            placeholder="Введите текст для анализа"
          ></textarea>
        </form>
      </div>

      <h2 className="authors-list-header">Результаты</h2>
      <div className="results-cards">
        {authors.map((author) => (
          <div className="card" key={author.id}>
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
                  <select name="period" id={`period-${author.id}`}>
                    <option value="early">Ранний</option>
                    <option value="mature">Зрелый</option>
                    <option value="late">Поздний</option>
                  </select>
                </div>
                <div className="probability-display">Вероятность: 0.5</div>
              </div>
            </div>
            <div className="card-actions"></div>
          </div>
        ))}
      </div>
      <form method="post" action="">
        <button type="submit" className="delete-button">
          Удалить
        </button>
      </form>
    </div>
  );
};