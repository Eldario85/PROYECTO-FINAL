import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class Internal_Clientes_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      apellido: "",
      direccion: "",
      telefono: "",
      correo_electronico: "",
      modal: false,
    };
  }

  // como utilizamos el mismo formulario para crear y actualizar clientess, si no vinene ningun parametro significa que es un ALTA
  // pero si viene "clientes_id" por parametro (dentro de las this.props del constructor) significa que es una MODIFICACION
  // por lo que aprovechamos el ciclo de vida del componente para realizar un fetch al backend y traer los datos del clientes a ser
  // modificado si es que viene dicho dato por parametro
  componentDidMount() {
    if (this.props.params.id) {
      let parametros = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: sessionStorage.getItem("token"),
        },
      };

      fetch(`http://localhost:8000/cliente/${this.props.params.id}`, parametros)
        .then((res) => {
          return res.json().then((body) => {
            return {
              status: res.status,
              ok: res.ok,
              headers: res.headers,
              body: body,
            };
          });
        })
        .then((result) => {
          if (result.ok) {
            this.setState({
              nombre: result.body.detail.nombre,
              apellido: result.body.detail.apellido,
              direccion: result.body.detail.direccion,
              telefono: result.body.detail.telefono,
              correo_electronico: result.body.detail.correo_electronico,
            });
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
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // handler invocado por el evento onSubmit() del formulario, aqui hay dos caminos posibles, un POST para la creacion o un PUT para la edicion
  // eso lo diferenciamos mediante "this.props.params.producto_id", acorde a su existencia debemos cambiar tanto la URL como el METHOD del fetch
  handleSubmit = (event) => {
    event.preventDefault();

    let cliente = {
      id: this.state.id,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      direccion: this.state.direccion,
      telefono: this.state.telefono,
      correo_electronico: this.state.correo_electronico,
    };

    let parametros = {
      method: this.props.params.id ? "PUT" : "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = this.props.params.id
      ? `http://localhost:8000/cliente/${this.props.params.id}`
      : "http://localhost:8000/cliente";
    fetch(url, parametros)
      .then((res) => {
        return res.json().then((body) => {
          return {
            status: res.status,
            ok: res.ok,
            headers: res.headers,
            body: body,
          };
        });
      })
      .then((result) => {
        if (result.ok) {
          toast.success(result.body.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          this.props.navigate("/clientes");
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
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>
              {this.props.params.id
                ? `Edicion del Cliente ${this.props.params.id}`
                : "Alta de Cliente"}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingNombre"
                  placeholder="Nombre"
                  onChange={this.handleChange}
                  value={this.state.nombre}
                  name="nombre"
                />
                <label htmlFor="floatingDescripcion">Nombre</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingApellido"
                  placeholder="Apellido"
                  onChange={this.handleChange}
                  value={this.state.apellido}
                  name="apellido"
                />
                <label htmlFor="floatingDescripcion">Apellido</label>
              </div>
              <br />

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingDireccion"
                  placeholder="Direccion"
                  onChange={this.handleChange}
                  value={this.state.direccion}
                  name="direccion"
                />

                <label htmlFor="direccion">Direccion</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingTelefono"
                  placeholder="Telefono"
                  onChange={this.handleChange}
                  value={this.state.telefono}
                  name="telefono"
                />

                <label htmlFor="telefono">Telefono</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.correo_electronico}
                  name="correo_electronico"
                />

                <label htmlFor="telefono">Email</label>
              </div>
              <br />

              <input
                className="btn btn-primary"
                type="submit"
                value="Guardar"
              />
            </form>
          </div>
        </div>
        {/* 
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal> */}
      </div>
    );
  }
}

export default Clientes_Edit;

export function Clientes_Edit() {
  const p = useParams();

  const navigate = useNavigate();

  return (
    <>
      <Internal_Clientes_Edit navigate={navigate} params={p} />
    </>
  );
}
