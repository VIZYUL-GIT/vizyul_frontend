import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Router } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { history } from "./../../stores";
import * as routes from "../../constants/routes";
import PageFactory from "../Pages/PageFactory";
import HomePage from "../Pages/HomePage";
import UploadFilePage from "../Pages/UploadFilePage";
import "./App.scss";

class App extends Component {
  componentWillMount() {
  }
  render() {
    const HomePageAugmented = () => (
      <PageFactory>
        <HomePage />
      </PageFactory>
    );
    const UploadFilePageAugmented = () => (
      <PageFactory>
        <UploadFilePage />
      </PageFactory>
    );

    console.log('history', history)
    // prettier-ignore
    return (
      <ConnectedRouter history={history}>
        <div className="app">
          {/* <Switch>
            <Redirect exact from="/" to={routes.HOME_PAGE} />
            <Route exact path={routes.HOME_PAGE} component={HomePageAugmented} />
          </Switch> */}
          <Route exact path={routes.HOME_PAGE} component={HomePageAugmented} />
          <Route exact path={routes.UPLOAD_FILE_PAGE} component={UploadFilePageAugmented} />
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
