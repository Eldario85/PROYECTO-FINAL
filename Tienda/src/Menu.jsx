import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Menu extends Component {
  render() {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg bg-primary"
          data-bs-theme="dark"
        >
          <a className=" navbar-brand" href="#">
            <img
              className="circular"
              src="favicon.png"
              alt=""
              width="50"
              height="50"
            />
          </a>
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/pedidos" className="nav-link">
                    Pedidos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/productos" className="nav-link">
                    Productos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Menu;
