import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dropzone from "react-dropzone";
import { Line } from 'rc-progress';
import { uploadFile } from "../../../actions/fileActions"
import endpoints from "../../../constants/endpoints.json"
import axios from 'axios'
import config from 'config'

class UploadFile extends Component {
  state = {
    percent: 0,
    upload: null
  };

  onDrop = files => {
    const endpoint = endpoints.POST_UPLOAD_FILE;
    const apiUrl = config.apiUrl;
    const url = `${apiUrl}/${endpoint.version}${endpoint.url}`
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const data = new FormData();
      data.append("file", file);
      data.append("file_name", file.name);

      const option = {
        headers: { 'Content-type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          let percent = Math.round(progressEvent.loaded * 100 / progressEvent.total)
          this.setState({ percent: percent })
        }
      };

      return axios.post(url, data, option)
    });
  
    // Once all the files are uploaded 
    axios.all(uploaders).then(() => {
      this.setState({upload: true})
    }).catch(function(error) {
      this.setState({upload: false})
    });
  }

  render() {
    const { percent, upload } = this.state
    return (
      <div className="upload-file-wrapper">
        <Dropzone onDrop={this.onDrop} className='dropzone-box' multiple name='file' accept=".twb">
        {({getRootProps, getInputProps, isDragActive, isDragReject}) => {
          return (<div>
            <div className="text-center">
              { upload != null 
                ? upload == true
                  ? <p>{`Upload File Success`}</p>
                  : <p>{`Upload File Failure`}</p>
                : <p>Try dropping some files here, or click to select files to upload. {percent}</p>
      
              }
              {isDragReject && "File type not accepted, sorry!"}
              </div>
            <Line percent={percent} strokeWidth='1' strokeColor='#2db7f5' strokeLinecap='square' />
          </div>
          )}
        }       
        </Dropzone>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  upload: state.fileReducer.upload,
  percent: state.fileReducer.percent
})
  
const mapDispatchToProps = dispatch =>
    bindActionCreators({ uploadFile }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFile);
