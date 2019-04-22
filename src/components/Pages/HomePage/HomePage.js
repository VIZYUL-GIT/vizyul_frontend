import React from "react";
import { connect } from "react-redux";
import "./HomePage.scss";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  }
}

const actions = {};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  actions
)(HomePage);
