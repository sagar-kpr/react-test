import React from "react";
import "../styles/formwrapper.css";

export default function (props) {
  

  return (
    <div className="box-form">
      <div className="left">
        <div className="overlay"></div>
      </div>
      {props.children}
      
    </div>
  );
}
