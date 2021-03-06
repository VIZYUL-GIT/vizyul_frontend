import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import * as routes from "../../constants/routes";
import PageFactory from "../Pages/PageFactory";
import HomePage from "../Pages/HomePage";
import UploadFilePage from "../Pages/UploadFilePage";
import XpathPage from "../Pages/XpathPage";
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

    const XpathPageAugmented = () => (
      <PageFactory>
        <XpathPage />
      </PageFactory>
    );

    // prettier-ignore
    return (
      <div className="app">
        <Route exact path={routes.HOME_PAGE} component={HomePageAugmented} />
        <Route exact path={routes.UPLOAD_PAGE} component={UploadFilePageAugmented} />
        <Route exact path={routes.XPATH_PAGE} component={XpathPageAugmented} />
      </div>
    );
  }
}

export default App;