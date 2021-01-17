import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";
import Captura from "./pages/Captura";
import Result from "./pages/Result";
import Home from "./pages/Home";
import ChatBot from "./pages/ChatBot";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Captura} />
      <Route exact path="/acesso" component={Captura} />
      <Route exact path="/result" component={Result} />
      <PrivateRoute path="/inicio" component={Home} />
      <PrivateRoute path="/chatbot" component={ChatBot} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;