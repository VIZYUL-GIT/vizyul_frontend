import React, { useCallback } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useDropzone } from 'react-dropzone';
import { Line } from 'rc-progress';
import axios from 'axios'
import config from 'config'
import { uploadFile } from "../../../actions/fileActions"
import endpoints from "../../../constants/endpoints.json"
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser
 
const UploadFile = ({
    updateState
  }) => {

  const onDrop = useCallback(acceptedFiles => {
    let countArray = []
    acceptedFiles.forEach(file => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result
      const doc = new dom().parseFromString(binaryStr)
      const datasource = xpath.select(`/workbook/datasources/datasource` , doc).length
      const worksheet = xpath.select(`/workbook/worksheets/worksheet`, doc).length
      const dashboard = xpath.select(`/workbook/dashboards/dashboard`, doc).length 
      const count = {
        "datasource": datasource,
        "worksheet": worksheet,
        "dashboard": dashboard
      } 
      countArray.push(count)
      updateState("countArray", countArray)
    }
      reader.readAsBinaryString(file)
    })
  }, [])


  const {getRootProps, getInputProps, rejectedFiles, isDragActive} = useDropzone({onDrop, accept: '.twb',})

  const rejectedFilesItems = rejectedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (   
    <section className="upload-file-wrapper">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <div className="drag-wrapper">
          <p>Drag some files here, or click to select files</p>
        </div>
      </div>
      <aside>
        { rejectedFilesItems.length != 0
        ? <div>
            <h4>Rejected files</h4>
            <ul>
              {rejectedFilesItems}
            </ul>
          </div>
        : null
        }  
      </aside>
      {/* <Line percent={percent} strokeWidth='1' strokeColor='#2db7f5' strokeLinecap='square' /> */}
    </section>
  );
}
const actions = {};

const mapDispatchToProps = () => {
  return {
  };
}

export default connect(
  mapDispatchToProps,
  actions
)(UploadFile);
