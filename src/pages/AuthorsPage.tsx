import { type FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthorCard } from "../components/AuthorCard";
import { Search, Users, UserSearch } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ROUTE_LABELS } from "../routes";
import { showPrediction } from "../config";
import { useDispatch } from "react-redux";
import { useAuthors, useFilter, setFilterAction, getAuthorsList, useAuthorsLoading } from "../slices/authorsSlice";
import { getDraftPrediction } from "../api/predictions";
import { Spinner } from "react-bootstrap";
import type { AppDispatch } from "../store";

export const AuthorsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const authors = useAuthors();
  const searchQuery = useFilter();
  const loading = useAuthorsLoading();
  const [predictionCount, setPredictionCount] = useState(0);

  useEffect(() => {
    dispatch(getAuthorsList());
    getDraftPrediction().then((data) => {
      if (data && data.count) {
        setPredictionCount(data.count);
      }
    });
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(getAuthorsList());
  };

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.AUTHORS }]} />
      <div className="search-and-summary">
        <form onSubmit={handleSearch} className="search-form">
          <Search className="lucide-search" strokeWidth={3} />
          <input
            type="text"
            name="author_name"
            value={searchQuery}
            onChange={(e) => dispatch(setFilterAction(e.target.value))}
            placeholder="Найти автора"
          />
          <button type="submit" disabled={loading} className="search-button-submit">
              Найти
          </button>
        </form>
      </div>

      <h1 className="page-title">
        <Users strokeWidth={3} />
        <span>Авторы</span>
      </h1>

      {loading ? (
        <div className="containerLoading" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="cards-grid">
          {authors.length ? (
            authors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))
          ) : (
             <section className="cities-not-found">
                <h1>К сожалению, пока ничего не найдено :(</h1>
             </section>
          )}
        </div>
      )}

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
              авторов: {predictionCount}
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


