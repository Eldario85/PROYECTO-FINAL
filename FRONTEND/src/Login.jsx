import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InternalLogin({ navigate }) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estaRegistrado, setEstaRegistrado] = useState(false); // Variable de estado para el registro

  const handleSubmit = (event) => {
    event.preventDefault();

    const usuario = {
      email: email,
      nickname: nickname,
      password: password,
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      telefono: telefono,
    };

    const endpoint = estaRegistrado
      ? "http://localhost:8000/usuario"
      : "http://localhost:8000/security/login";

    // const method = estaRegistrado ? "POST" : "POST";

    const parametros = {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(endpoint, parametros)
      .then((res) =>
        res.json().then((body) => ({
          status: res.status,
          ok: res.ok,
          headers: res.headers,
          body: body,
        }))
      )
      .then((result) => {
        if (result.ok) {
          if (estaRegistrado) {
            toast.success(`Registro exitoso. Ahora inicia sesión.`, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setEstaRegistrado(false);
          } else {
            sessionStorage.setItem("token", result.body.token);

            toast.success(`Bienvenido, ${usuario.nickname}`, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate("/");
          }
        } else {
          toast.error(result.body.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) =>
        toast.error(error.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };

  if (estaRegistrado) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>{estaRegistrado ? "Registro de Usuario" : "Iniciar Sesión"}</h1>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit}>
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  name="email"
                />
                <label htmlFor="Email">Email</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="nickname"
                  onChange={(e) => setNickname(e.target.value)}
                  value={nickname}
                  name="nickname"
                />
                <label htmlFor="nickname">Usuario</label>
              </div>
              <br />

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                />
                <label htmlFor="password">Contraseña</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  onChange={(e) => setNombre(e.target.value)}
                  value={nombre}
                  name="nombre"
                />
                <label htmlFor="nombre">Nombre</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  onChange={(e) => setApellido(e.target.value)}
                  value={apellido}
                  name="apellido"
                />
                <label htmlFor="apellido">Apellido</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  onChange={(e) => setDireccion(e.target.value)}
                  value={direccion}
                  name="direccion"
                />
                <label htmlFor="direccion">Direccion</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  onChange={(e) => setTelefono(e.target.value)}
                  value={telefono}
                  name="telefono"
                />
                <label htmlFor="telefono">Telefono</label>
              </div>
              <br />

              <button type="submit" className="btn btn-primary">
                {estaRegistrado ? "Registrarse" : "Ingresar"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEstaRegistrado(!estaRegistrado)}
              >
                {estaRegistrado ? "Iniciar Sesión" : "Registrarse"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>{estaRegistrado ? "Registro de Usuario" : "Iniciar Sesión"}</h1>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit}>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="nickname"
                  onChange={(e) => setNickname(e.target.value)}
                  value={nickname}
                  name="nickname"
                />
                <label htmlFor="nickname">Usuario</label>
              </div>
              <br />

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                />
                <label htmlFor="password">Contraseña</label>
              </div>
              <br />

              <button type="submit" className="btn btn-primary">
                {estaRegistrado ? "Registrarse" : "Ingresar"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEstaRegistrado(!estaRegistrado)}
              >
                {estaRegistrado ? "Iniciar Sesión" : "Registrarse"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function Login() {
  const { p } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <InternalLogin navigate={navigate} params={p} />
    </>
  );
}

export default Login;
