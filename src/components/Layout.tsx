import { type FC, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className="app-header">
        <Link to="/" className="home-button">
          Домой
        </Link>
      </header>
      <main className="main-container">{children}</main>
    </>
  );
};
