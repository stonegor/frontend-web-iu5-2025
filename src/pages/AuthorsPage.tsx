import { type FC, useState } from "react";
import { Link } from "react-router-dom";
import { AUTHORS_MOCK } from "../api/mock";
import type { Author } from "../api/types";
import { AuthorCard } from "../components/AuthorCard";

export const AuthorsPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [authors] = useState<Author[]>(AUTHORS_MOCK);

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="search-and-summary">
        <form action="" method="get" className="search-form">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            name="author_name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Найти автора"
          />
        </form>
      </div>

      <h1 className="page-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-users"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span>Авторы</span>
      </h1>

      <div className="cards-grid">
        {filteredAuthors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>

      <div className="meal-button-container">
        <Link to="/prediction" className="meal-link">
          <div className="prediction-button">
            <div className="prediction-left">
              Выбрано
              <br />
              авторов: 0
            </div>
            <div className="prediction-right">
              Продолжить
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-search"
              >
                <circle cx="10" cy="7" r="4" />
                <path d="M10.3 21H1" />
                <path d="m21 21-1.9-1.9" />
                <circle cx="17" cy="17" r="3" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
