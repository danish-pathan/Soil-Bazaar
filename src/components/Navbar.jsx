import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <container>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Soil Bazaar
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="soil/list">
                  Add Listing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </container>
  );
};

export default Navbar;
