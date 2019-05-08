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
 


const UploadFile = ({
    countArray,
    updateState
  }) => {

  const onDrop = useCallback(acceptedFiles => {
    let counntArray = []
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
     // let story = xpath.select(`/workbook/dashboards/dashboard(type <> 'storyboard')`, doc)
      const count = {
        "datasource": datasource,
        "worksheet": worksheet,
        "dashboard": dashboard
      } 
      counntArray.push(count)
    }
      reader.readAsBinaryString(file)
    })
    updateState("countArray", counntArray)
  }, [])


  const {getRootProps, getInputProps, rejectedFiles, isDragActive} = useDropzone({onDrop, accept: '.twb',})

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
      <ul>
          {rejectedFilesItems}
      </ul>
      { typeof countArray !== "undefined" 
        ? <ul className="file-list"> 
            {countArray.map((file, key) => (
            <li key={key}>
                <p>Datasource: {file.datasource}</p>
                <p>Worksheet: {file.worksheet}</p>
                <p>Dashboard: {file.dashboard}</p>
            </li>
            ))}
          </ul>
        : null } 
      {/* <Line percent={percent} strokeWidth='1' strokeColor='#2db7f5' strokeLinecap='square' /> */}
    </section>
  );
}
const actions = {};

const mapDispatchToProps = (state) => {
  return {
  };
}

export default connect(
  mapDispatchToProps,
  actions
)(UploadFile);
