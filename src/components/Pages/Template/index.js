import React from "react";
import Header from "../Header";
import "./Template.scss";

const Template = props => {
  return (
    <div>
      <Header />
      <div className="page_wrapper">
        <div className="side-body">{props.children}</div>
      </div>
    </div>
  );
};

export default Template;
