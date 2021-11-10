import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import {  useSelector } from "react-redux";
import { LoginScreen } from "../components/auth/LoginScreen";
import { EcuacionesScreen } from "../components/ecuaciones/EcuacionesScreen";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Lista } from '../components/lista/Lista'

export const AppRouter = () => {
  const { isLogin } = useSelector((state) => state.auth);
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={LoginScreen}
            isAuthenticated={!!isLogin}
          />
          <PrivateRoute
            exact
            path="/"
            component={EcuacionesScreen}
            isAuthenticated={!!isLogin}
          />
          <PrivateRoute
            exact
            path="/lista"
            component={Lista}
            isAuthenticated={!!isLogin}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
