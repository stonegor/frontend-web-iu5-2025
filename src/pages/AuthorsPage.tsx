import { type FC } from "react";
import { Link } from "react-router-dom";
import { AuthorCard } from "../components/AuthorCard";
import { Search, Users, UserSearch } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ROUTE_LABELS } from "../routes";
import { showPrediction } from "../config";
import { useDispatch } from "react-redux";
import { useAuthors, useFilter, setFilterAction } from "../slices/authorsSlice";
import { GetData } from "../getData";

export const AuthorsPage: FC = () => {
  const dispatch = useDispatch();
  GetData();
  
  const authors = useAuthors();
  const searchQuery = useFilter();

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.AUTHORS }]} />
      <div className="search-and-summary">
        <form action="" method="get" className="search-form">
          <Search className="lucide-search" strokeWidth={3} />
          <input
            type="text"
            name="author_name"
            value={searchQuery}
            onChange={(e) => dispatch(setFilterAction(e.target.value))}
            placeholder="Найти автора"
          />
        </form>
      </div>

      <h1 className="page-title">
        <Users strokeWidth={3} />
        <span>Авторы</span>
      </h1>

      <div className="cards-grid">
        {filteredAuthors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>

      <div className="meal-button-container">
        <Link
          to={showPrediction ? "/prediction" : "#"}
          className={`meal-link ${!showPrediction ? "disabled" : ""}`}
          onClick={(e) => !showPrediction && e.preventDefault()}
        >
          <div className="prediction-button">
            <div className="prediction-left">
              Выбрано
              <br />
              авторов: 0
            </div>
            <div className="prediction-right">
              Продолжить
              <UserSearch strokeWidth={3} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
