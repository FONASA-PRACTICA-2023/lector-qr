import React, { Fragment } from "react";
import { Helmet } from "react-helmet";

import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../contexto";

export const Layout = ({ children, title, subtitle }) => {
  const { userHasAuthenticated } = useAppContext();

  const navigate = useNavigate();

  return (
    <Fragment>
      <Helmet>
        {title && <title>{title} | ASM </title>}
        {subtitle && <meta name="description" content={subtitle} />}
      </Helmet>

      <div className="container">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top">
          <Link className="navbar-brand" to="/buscar">
            Modelo Predictivo Ley de Urgencia
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active"></li>
              <li className="nav-item">
                <Link className="nav-link" to="/crear">
                  Crear caso
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/buscar">
                  Buscar casos
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" className="container">
          <div>
            {title && <h1>{title}</h1>}
            {subtitle && <h2>{subtitle}</h2>}
            {children}
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default Layout;
