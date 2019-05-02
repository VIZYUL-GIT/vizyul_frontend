import React from "react";
import { connect } from "react-redux";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import * as routes from "../../../constants/routes"

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
                            <li key="1"><NavLink to={routes.HOME_PAGE} className="normal" activeClassName="active" isActive={isActive.bind(this, 'home')} exact>Home</NavLink></li>
                            <li key="2"><NavLink to={routes.UPLOAD_PAGE} className="normal" activeClassName="active" isActive={isActive.bind(this, 'file/upload')} exact>Upload</NavLink></li>
                            <li key="3"><NavLink to={routes.XPATH_PAGE} className="normal" activeClassName="active" isActive={isActive.bind(this, 'file/xpath')} exact>Xpath</NavLink></li>
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