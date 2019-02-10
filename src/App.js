import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NabBar from "./components/navBar";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import Customers from "./components/customers";
import MovieDetail from "./components/movieDetail";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NabBar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieDetail} />
            <Route path="/movies" component={Movies} />
            <Route path="/login" component={LoginForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
