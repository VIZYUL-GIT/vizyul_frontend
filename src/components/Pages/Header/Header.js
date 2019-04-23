import React from "react";
import { connect } from "react-redux";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const isActive = (path, match) => {
            return this.props.match.params.section == path ||
              this.props.match.path.indexOf(path) >= 0
              ? true
              : false;
          };
          
        return (
            <header>
                <nav className="navbar navbar-default" role="navigation">
                    <div className="navbar-brand"></div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav">
                            <li key="1"><NavLink to="/home" className="normal" activeClassName="active" isActive={isActive.bind(this, 'home')} exact>Home</NavLink></li>
                            <li key="2"><NavLink to="/file/upload" className="normal" activeClassName="active" isActive={isActive.bind(this, 'file/upload')} exact>Upload File</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

const actions = {};

const mapStateToProps = state => {
    return {};
};
  
export default withRouter(
    connect(
      mapStateToProps,
      actions
    )(Header)
  );