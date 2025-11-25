import { type FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthorsPage } from "./pages/AuthorsPage";
import { AuthorDetailPage } from "./pages/AuthorDetailPage";
import { PredictionPage } from "./pages/PredictionPage";
import { HomePage } from "./pages/HomePage";

const App: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/authors"
        element={
          <Layout>
            <AuthorsPage />
          </Layout>
        }
      />
      <Route
        path="/author/:id"
        element={
          <Layout>
            <AuthorDetailPage />
          </Layout>
        }
      />
      <Route
        path="/prediction"
        element={
          <Layout>
            <PredictionPage />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;