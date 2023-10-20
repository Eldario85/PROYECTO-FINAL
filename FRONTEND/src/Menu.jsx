import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

function Menu() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const t = sessionStorage.getItem("token");
    if (t !== token) {
      setToken(t);
    }
  });

  function logout() {
    sessionStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  // const token = sessionStorage.getItem('token')
  if (token !== "" && token !== null) {
    // var decoded = jwt_decode(token);
    return (
      <>
        <nav
          className="navbar navbar-expand-lg bg-primary"
          data-bs-theme="dark"
        >
          <a className=" navbar-brand" href="#">
            <Image
              className="circular"
              src="faviconfutbol.ico.jpg"
              roundedCircle
              width="50"
              height="50"
            />
          </a>

          <div className="container">
            <Link to="/" className="nav-link">
              {" "}
              Home
            </Link>
            <Button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </Button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/productos" className="nav-link">
                    {" "}
                    Productos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/pedido" className="nav-link">
                    {" "}
                    Pedidos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/clientes" className="nav-link">
                    {" "}
                    Clientes
                  </Link>
                </li>

                <li className="nav-item">
                  <Button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => logout()}
                  >
                    <span className="material-symbols-outlined">logout</span>
                  </Button>

                  {/* <Link to="/login" className="nav-link">
                    {" "}
                    Login
                  </Link> */}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg bg-primary"
          data-bs-theme="dark"
        >
          <a className=" navbar-brand" href="#">
            <Image
              className="circular"
              src="faviconfutbol.ico.jpg"
              roundedCircle
              alt=""
              width="50"
              height="50"
            />
          </a>
          <div className="container">
            <Link to="/" className="nav-link">
              {" "}
              Inicio
            </Link>
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
                  <Link to="/login" className="nav-link">
                    {" "}
                    Login / Registrarse
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
