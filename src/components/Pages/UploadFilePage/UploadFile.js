import React, { useCallback } from 'react';
import { connect } from "react-redux";
import { useDropzone } from 'react-dropzone';
import axios from 'axios'
import config from 'config'
import endpoints from "../../../constants/endpoints.json"
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser
 
const UploadFile = ({
    upload,
    percent,
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
      const filename = file.name
      const filesize = file.size
      const datasource = xpath.select(`/workbook/datasources/datasource` , doc).length
      const worksheet = xpath.select(`/workbook/worksheets/worksheet`, doc).length
      const dashboard = xpath.select(`/workbook/dashboards/dashboard`, doc).length 
      const count = {
        "filename": filename,
        "filesize": filesize,
        "datasource": datasource,
        "worksheet": worksheet,
        "dashboard": dashboard
      } 
      countArray.push(count)
      updateState("countArray", countArray)
    }
      reader.readAsBinaryString(file)
    })

    if(acceptedFiles.length>0){
      onFileUpload(acceptedFiles)
    }
  }, [])

  const onFileUpload = async (acceptedFiles) => {
    const endpoint = endpoints.POST_UPLOAD_FILE;
    const apiUrl = config.apiUrl;
    const url = `${apiUrl}/${endpoint.version}${endpoint.url}`
    // Push all the axios request promise into a single array
    let promisall = []
    let errors = []

    acceptedFiles.forEach((file, key) => {
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
      promisall.push(new Promise((resolve, reject) => {
        axios.post(url, data, option).then(() => {
          resolve()
        })
        .catch((err) => {
          const error = 'Filename: ' + file.name + err
          errors.push(error)
          resolve()
        });
      }))
    });

    // Once all the files are uploaded 
    Promise.all(promisall).then(() => {
      if(errors.length>0){
        updateState("upload", {"state": false, "err": errors})
      }else{
        updateState("upload", {"state": true})
      }
    }).catch((err) => {
        updateState("upload", {"state": false, "err": err})
    }) 
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
          { upload.state != null 
                ? (upload.state == true
                  ? <p>{`Upload File Success`}</p>
                  : (<div className="errors">
                      <p>{`Upload File Failure:`}</p>
                      <ul>
                        {upload.err.map((error, key) => (
                          <p key={key}>{error}</p>
                        ))}
                      </ul>
                      </div>)
                  )
                : <p>Try dropping some files here, or click to select files to upload. {percent}</p>
          }
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
