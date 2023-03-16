import React from "react";
import "../styles/navbar.css";

export function Navbar() {
  return (
    <div className="nav">
      <div className="logo-part">
        <h1>logo</h1>
      </div>
      <div className="list-part">
        <button>Logout</button>
      </div>
    </div>
  );
}
