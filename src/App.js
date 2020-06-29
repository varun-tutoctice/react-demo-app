import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddArtifact from "./components/add-artifact.component";
import Artifact from "./components/artifact.component";
import ArtifactList from "./components/artifacts-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/artifacts" className="navbar-brand">
              ReactDemoApplication
            </a>
            <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/artifacts"} className="nav-link">
                  Artifacts
                </Link>
              </li>

            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
            <Route exact path={["/", "/add"]} component={AddArtifact} />
              <Route exact path="/artifacts" component={ArtifactList} />
              <Route path="/artifacts/:id" component={Artifact} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
