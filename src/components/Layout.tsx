import { type FC, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "./Navbar";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className="app-header">
        <div className="header-container">
          <Link to="/" className="home-button">
            Домой
          </Link>
          <AppNavbar />
        </div>
      </header>
      <main className="main-container">{children}</main>
    </>
  );
};
