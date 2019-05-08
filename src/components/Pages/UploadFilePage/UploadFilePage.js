import React from "react";
import { connect } from "react-redux";
import "./UploadFilePage.scss";
import UploadFile from "./UploadFile"

class UploadFilePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      countArray: [{
        datasource: "",
        worksheet: "",
        dashboard: ""
      }]
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    const { updateState } = this;
    return (
      <div>
        <h1>UploadFile Page</h1>
        <UploadFile
          {...{
            ...this.props,
            ...this.state,
            updateState,
          }}
        />
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
)(UploadFilePage);
