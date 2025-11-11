import { type FC } from "react";

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
    </div>
  );
};