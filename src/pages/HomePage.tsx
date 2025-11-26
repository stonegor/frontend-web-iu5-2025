import { type FC, useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { type Author } from "../api/types";
import { GetData } from "../getData";
import { useAuthors } from "../slices/authorsSlice";
import defaultAuthor from "/AuthorPlaceholder.png";

export const HomePage: FC = () => {
  // Fetch data into Redux store
  GetData();
  
  // Select data from Redux store
  const allAuthors = useAuthors();
  const [displayedAuthors, setDisplayedAuthors] = useState<Author[]>([]);

  // Update local displayed state when authors change
  useEffect(() => {
    setDisplayedAuthors(
      allAuthors.filter(
        (a) =>
          a.image_url &&
          (a.image_url.startsWith("http") || a.image_url.startsWith("/"))
      )
    );
  }, [allAuthors]);

  return (
    <div style={{ textAlign: "center", paddingTop: "5rem" }}>
      <h1>Поиск автора по тексту</h1>
      <p style={{ maxWidth: "600px", margin: "1rem auto" }}>
        Это приложение позволяет определить автора текста на основе
        статистического анализа частоты использования определенных слов.
        Выберите одного или нескольких авторов для сравнения и введите текст для
        анализа.
      </p>

      {displayedAuthors.length > 0 && (
        <div style={{ maxWidth: "900px", margin: "3rem auto" }}>
          <Carousel interval={5000} pause="hover">
            {displayedAuthors.map((author) => (
              <Carousel.Item key={author.id}>
                <img
                  className="d-block w-100"
                  src={author.image_url}
                  alt={author.name}
                  onError={(e) => {
                    e.currentTarget.src = defaultAuthor;
                  }}
                  style={{
                    height: "450px",
                    objectFit: "cover",
                    borderRadius: "16px",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};