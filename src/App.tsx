import { type FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthorsPage } from "./pages/AuthorsPage";
import { AuthorDetailPage } from "./pages/AuthorDetailPage";
import { PredictionPage } from "./pages/PredictionPage";
import { PredictionsListPage } from "./pages/PredictionsListPage";
import { HomePage } from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { ROUTES } from "./routes";

const App: FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path={ROUTES.AUTHORS}
        element={
          <Layout>
            <AuthorsPage />
          </Layout>
        }
      />
      <Route
        path={ROUTES.PREDICTIONS}
        element={
          <Layout>
            <PredictionsListPage />
          </Layout>
        }
      />
      <Route
        path={ROUTES.AUTHOR_DETAIL}
        element={
          <Layout>
            <AuthorDetailPage />
          </Layout>
        }
      />
      <Route
        path={`${ROUTES.PREDICTION}/:id`}
        element={
          <Layout>
            <PredictionPage />
          </Layout>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <Layout>
            <LoginPage />
          </Layout>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <Layout>
            <RegisterPage />
          </Layout>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <Layout>
            <ProfilePage />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;