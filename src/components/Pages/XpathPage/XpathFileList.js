import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { requestList, queryXpath } from "../../../actions/xpathActions"

class XpathFileList extends Component {
    constructor(props) {
        super(props);
        this.queryXpath = this.queryXpath.bind(this);
        this.state = {
            file: "",
            xpath: ""
        }
    }
    componentDidMount() {
        this.props.requestList();
    }
    queryXpath = (file, xpath) => {
        this.props.queryXpath(file, xpath)
    }
    render() {
    const { file, xpath } = this.state
    const { files, xpaths } = this.props
    console.log('files', files)
    const { queryXpath } = this
        return (
        <div>
            <div>
                <label htmlFor="xpath">Query XPATH:</label>
                <input 
                    type="text"
                    className="form-control"
                    value= {xpath}
                    onChange={event => {this.setState({xpath:  event.target.value})}}
                />
                <button onClick={()=>{
                    queryXpath(file, xpath)
                }}>Search</button>
            </div>
        { typeof files !== "undefined" 
        ? <ul className="file-list"> 
            {files.map((file, key) => (
            <li key={key} onClick={() => { this.setState({file: file._id})}}>
                <a>{file.name}</a>
            </li>
            ))}
          </ul>
        : null }  
        { typeof xpaths !== "undefined" 
        ? <div>
            <label htmlFor="xpath">Query XPATH:</label>
            <ul className="xpath-list"> 
                {xpaths.map((xpath, key) => (
                <li key={key} >
                    <p>{xpath.string}</p>
                </li>
                ))}
            </ul>
          </div>
        : null } 
        </div>);
    }
}

const mapStateToProps = (state) => ({
    files: state.xpathReducer.files,
    xpaths: state.xpathReducer.xpaths,
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ requestList, queryXpath }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(XpathFileList);
