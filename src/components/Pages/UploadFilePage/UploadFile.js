import React, { useCallback } from 'react';
import { connect } from "react-redux";
import { useDropzone } from 'react-dropzone';
import axios from 'axios'
import config from 'config'
import endpoints from "../../../constants/endpoints.json"
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser
 
const UploadFile = ({
    updateState,
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
    onFileUpload(acceptedFiles)
  }, [])

  const onFileUpload = async (acceptedFiles) => {
    const endpoint = endpoints.POST_UPLOAD_FILE;
    const apiUrl = config.apiUrl;
    const url = `${apiUrl}/${endpoint.version}${endpoint.url}`
    // Push all the axios request promise into a single array
    const uploaders = acceptedFiles.map(file => {
      // Initial FormData
      const data = new FormData();
      data.append("file", file);
      data.append("file_name", file.name);

      const option = {
        headers: { 'Content-type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          let percent = Math.round(progressEvent.loaded * 100 / progressEvent.total)
          updateState("percent", percent)
        }
      };

      return axios.post(url, data, option)
    });

    // Once all the files are uploaded 
    axios.all(uploaders).then(() => {
      updateState("upload", true)
    }).catch(function(error) {
      updateState("upload", false)
    });
  }

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
