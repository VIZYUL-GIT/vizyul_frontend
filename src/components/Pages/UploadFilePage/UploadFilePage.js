import React from "react";
import { connect } from "react-redux";
import "./UploadFilePage.scss";
import UploadFile from "./UploadFile"

class UploadFilePage extends React.Component {
  render() {

    const msg = this.props.upload===null?'':(this.props.upload===true?'File sucessfully uploaded':'File upload failed');

    return (
      <div>
        <h1>UploadFile Page</h1>
        <UploadFile/>
        <span>{msg}</span>
      </div>
    );
  }
}

const actions = {};

const mapStateToProps = state => {
  return {
    upload: state.fileReducer.upload
  };
};

export default connect(
  mapStateToProps,
  actions
)(UploadFilePage);
