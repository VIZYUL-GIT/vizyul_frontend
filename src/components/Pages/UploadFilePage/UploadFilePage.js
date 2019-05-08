import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./UploadFilePage.scss";
import UploadFile from "./UploadFile"
import { Line } from 'rc-progress';
import { uploadFile } from "../../../actions/fileActions"

class UploadFilePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      percent: 0,
      upload: {
        state: null,
        err: []
      },
      countArray: [],
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(key, value) {
    this.setState({ [key]: value },() => this.forceUpdate());
  }

  render() {
    const {countArray, percent} = this.state
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
                <p><b>File name:</b> {file.filename}</p>
                <p><b>File size:</b> {file.filesize}</p>
                <p><b>Datasource:</b> {file.datasource}</p>
                <p><b>Worksheet:</b> {file.worksheet}</p>
                <p><b>Dashboard:</b> {file.dashboard}</p>
            </div>
            ))}
          </div>
        : null }
         <Line percent={percent} strokeWidth='1' strokeColor='#2db7f5' strokeLinecap='square' />
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
