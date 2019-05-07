import axios from 'axios'
import config from 'config'
import React, { useCallback } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useDropzone } from 'react-dropzone';
import { Line } from 'rc-progress';
import { uploadFile } from "../../../actions/fileActions"
import endpoints from "../../../constants/endpoints.json"
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser
 


const UploadFile = () => {
  const {rejectedFiles, getRootProps, getInputProps} = useDropzone({
    accept: '.twb',
    multiple: true,
    onDrop: acceptedFiles => {
      const endpoint = endpoints.POST_UPLOAD_FILE;
      const apiUrl = config.apiUrl;
      const url = `${apiUrl}/${endpoint.version}${endpoint.url}`
      // Push all the axios request promise into a single array
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        var doc = new dom().parseFromString(binaryStr)
        var nodes = xpath.select("/workbook/datasources/datasource", doc)
        console.log(' Count of /workbook/datasources/datasource', nodes.length) 
      }
  
      acceptedFiles.forEach(file => reader.readAsBinaryString(file))
      // const uploaders = acceptedFiles.map(file => {
      //   console.log('file', file)
      //   // Initial FormData
      //   const data = new FormData();
      //   data.append("file", file);
      //   data.append("file_name", file.name);
  
      //   const option = {
      //     headers: { 'Content-type': 'multipart/form-data' },
      //     onUploadProgress: progressEvent => {
      //       let percent = Math.round(progressEvent.loaded * 100 / progressEvent.total)
      //       this.setState({ percent: percent })
      //     }
      //   };
  
      //   return axios.post(url, data, option)
      // });
    
      // Once all the files are uploaded 
      // axios.all(uploaders).then(() => {
      //   this.setState({upload: true})
      // }).catch(function(error) {
      //   this.setState({upload: false})
      // });
    }
  });
  
  const rejectedFilesItems = rejectedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Rejected files</h4>
        <ul>
          {rejectedFilesItems}
        </ul>
      </aside>
      {/* <Line percent={percent} strokeWidth='1' strokeColor='#2db7f5' strokeLinecap='square' /> */}
    </section>
  );
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
