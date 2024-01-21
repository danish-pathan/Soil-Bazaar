import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const Navbar = () => {
  const firebase = useFirebase();

  const handleLogout = async () => {
    await firebase.signOut();
  };
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
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              {!firebase.isLoggedIn && (
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Register
                  </Link>
                </li>
              )}
              {firebase.isLoggedIn && (
                <li className="nav-item">
                  <Link to="/soil/list" className="nav-link text-light">
                    Add Listing
                  </Link>
                </li>
              )}
              {firebase.isLoggedIn ? (
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-link text-light"
                  >
                    Logout
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </container>
  );
};

export default Navbar;
