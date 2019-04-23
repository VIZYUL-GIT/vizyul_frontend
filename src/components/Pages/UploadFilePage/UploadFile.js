import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactDropzone from "react-dropzone";
import { uploadFile } from "../../../actions/fileActions"
class UploadFile extends Component {
  onDrop = (files) => {
      this.props.uploadFile(files)
  }

  render() {
    return (
      <div className="app">
        <ReactDropzone
          multiple 
          onDrop={this.onDrop}
        >
          Drag your file
        </ReactDropzone>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    
  });
  
const mapDispatchToProps = dispatch =>
    bindActionCreators({ uploadFile }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFile);
