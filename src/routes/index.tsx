import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Product from "../pages/Product";
import SystemLog from "../pages/System";
import PageNotFound from "../components/PageNotFound";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/logs" component={SystemLog} isPrivate />
      <Route path="/product" component={Product} isPrivate />

      <Route path="/" component={PageNotFound} isPrivate />
    </Switch>
  );
};

export default Routes;
