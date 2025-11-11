import { type FC } from "react";
import { Link } from "react-router-dom";

export const HomePage: FC = () => {
  return (
    <div style={{ textAlign: "center", paddingTop: "5rem" }}>
      <h1>Поиск автора по тексту</h1>
      <p style={{ maxWidth: "600px", margin: "1rem auto" }}>
        Это приложение позволяет определить автора текста на основе
        статистического анализа частоты использования определенных слов.
        Выберите одного или нескольких авторов для сравнения и введите текст для
        анализа.
      </p>
      <Link to="/authors" className="meal-link">
        <button
          className="add-button"
          style={{ padding: "1rem 2rem", fontSize: "1.2rem" }}
        >
          К авторам
        </button>
      </Link>
    </div>
  );
};