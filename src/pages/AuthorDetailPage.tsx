import { type FC } from "react";
import { useParams } from "react-router-dom";
import { AUTHORS_MOCK } from "../api/mock";
import { User } from "lucide-react";

export const AuthorDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const author = AUTHORS_MOCK.find((a) => a.id === Number(id));

  if (!author) {
    return <div>Автор не найден</div>;
  }

  return (
    <div>
      <h1 className="page-title">
        <User strokeWidth={3} />
        <span>{author.name}</span>
      </h1>

      <div className="nutrient is-promoted card usa-card__container clearfix author-card-huge">
        <div className="usa-card__media">
          <img
            src={author.image_url}
            alt={author.name}
            className="card-image"
          />
        </div>
        <div className="card-content">
          <div className="column-large card-column">
            <div className="author-about">
              <h2>Об авторе</h2>
              <p>{author.about || "Нет информации об авторе."}</p>
            </div>
          </div>
          <div className="column-small card-column">
            <div className="author-stats">
              <h2 className="card-subtitle">В среднем на 100 слов:</h2>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};