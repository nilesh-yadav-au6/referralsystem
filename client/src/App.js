import React from "react";
import "../src/styles.css";
import NavBar from "../src/components/NavBar/NavBar";
import { Route, Switch } from "react-router-dom";
import Login from "./components/SignIn/Login";
import SingUp from "./components/SignUp/SignUp";
import Dashbaord from "./components/UserDashboard/Dashboard";
import Home from "./components/HomePage/HomePage";
import Admin from "./components/AdminDash/AdminDash"

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/dashboard" component={Dashbaord} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/register" component={SingUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}
