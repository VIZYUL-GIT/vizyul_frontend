import React, { Component } from "react";
import { connect } from "react-redux";
import "./XpathPage.scss";
import XpathFileList from "./XpathFileList";

class XpathPage extends Component {
  render() {
    return (
      <div>
        <h1>Xpath Page</h1>
        <XpathFileList />
      </div>
    );
  }
}

const actions = {};

const mapStateToProps = (state) => {
  return {
  };
}

export default connect(
  mapStateToProps,
  actions
)(XpathPage);
