import { type FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthorCard } from "../components/AuthorCard";
import { Search, Users, UserSearch } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ROUTE_LABELS, ROUTES } from "../routes";
import { useDispatch, useSelector } from "react-redux";
import { useAuthors, useFilter, setFilterAction, getAuthorsList, useAuthorsLoading } from "../slices/authorsSlice";
import { Spinner } from "react-bootstrap";
import type { AppDispatch, RootState } from "../store";

export const AuthorsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const authors = useAuthors();
  const searchQuery = useFilter();
  const loading = useAuthorsLoading();
  
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const { prediction_id, count } = useSelector((state: RootState) => state.predictions);

  useEffect(() => {
    dispatch(getAuthorsList());
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(getAuthorsList());
  };
  
  const isCartActive = isAuthenticated && prediction_id && !isNaN(prediction_id);

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: ROUTE_LABELS.AUTHORS }]} />
      <div className="search-and-summary d-flex align-items-center gap-2">
        <form onSubmit={handleSearch} className="search-form flex-grow-1">
          <button type="submit" disabled={loading} className="search-icon-btn">
            <Search className="lucide-search" strokeWidth={3} />
          </button>
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
          to={isCartActive ? `${ROUTES.PREDICTION}/${prediction_id}` : "#"}
          className={`meal-link ${!isCartActive ? "disabled" : ""}`}
          onClick={(e) => !isCartActive && e.preventDefault()}
        >
          <div className="prediction-button">
            <div className="prediction-left">
              Выбрано
              <br />
              авторов: {count || 0}
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
