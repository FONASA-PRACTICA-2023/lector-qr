import React from "react";
import { Edit2, LogOut } from "react-feather";
import { Link, NavLink } from "react-router-dom";
import logoFonasa from "../assets/logo-fonasa.svg";
import constantes from "./constantes.json";
function MenuSuperior({ user }) {
  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={logoFonasa}
              alt="Fonasa"
              className="logo-fonasa img-fluid"
            />
            {process.env.REACT_APP_NOMBRE_APLICACION}-
            {process.env.REACT_APP_AMBIENTE}-{process.env.REACT_APP_VERSION}
          </Link>

          {user && (
            <>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {constantes.menu.map((item) => (
                    <li className="nav-item" key={item.path}>
                      <NavLink
                        to={item.path}
                        replace={true}
                        className="nav-link"
                        >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="nav navbar-nav navbar-right hidden-xs text-light">
                  <span className ="pull-left user-top">
                    <p className="mT10 ng-binding ng-scope">
                      <span className="fw-semibold">Bienvenido/a, </span>
                      {user.nombre}
                    </p>

                    <p>
                      <span className="fw-semibold">RUN: </span> {user.run}
                    </p>
                    <p>
                      {user.tipo_usuario} {" / "} {user.institucion}
                    </p>
                    <p>
                      <Link className="link-light" to={constantes.logout}>
                        Cerrar Sesión
                      </Link>
                    </p>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default MenuSuperior;
