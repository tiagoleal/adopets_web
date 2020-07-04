import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Product from "../pages/Product";
import Profile from "../pages/Profile";
import SystemLog from "../pages/System";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/logs" component={SystemLog} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/product" component={Product} isPrivate />
    </Switch>
  );
};

export default Routes;
