import React from "react";
import { Route, Navigate } from "react-router-dom";
import auth from "./login/auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return <Navigate to="/" replace={true} />;
        }
      }}
    />
  );
};
