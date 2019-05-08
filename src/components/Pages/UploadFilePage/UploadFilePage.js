import React from "react";
import { connect } from "react-redux";
import "./UploadFilePage.scss";
import UploadFile from "./UploadFile"

class UploadFilePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      countArray: []
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(key, value) {
    this.setState({ [key]: value },() => this.forceUpdate());
  }

  render() {
    const {countArray} = this.state
    console.log('  console.log(countArray.length)', countArray.length)
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
      { typeof countArray.length != 0 
        ? <div className="file-list"> 
            
            {countArray.map((file, key) => (
            <div className="file-count" key={key}>
                <p>Datasource: {file.datasource}</p>
                <p>Worksheet: {file.worksheet}</p>
                <p>Dashboard: {file.dashboard}</p>
            </div>
            ))}
          </div>
        : null }
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
