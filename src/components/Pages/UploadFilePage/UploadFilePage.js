import React from "react";
import { connect } from "react-redux";
import "./UploadFilePage.scss";

class UploadFilePage extends React.Component {
  render() {
    return (
      <div>
        <h1>UploadFile Page</h1>
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
)(UploadFilePage);
