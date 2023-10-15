import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export class Productos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productos: [],
      modal: false,
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  // funcion ejecutada al montar el componente, tras ejecutarse el render,
  // este metodo realiza un fetch al endpoint listar()
  // para traer el listado de vehiculos y setearlos en en estado "vehiculos"
  componentDidMount() {
    let parametros = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // authorization: sessionStorage.getItem("token"),
      },
    };

    fetch("http://localhost:8000/producto", parametros)
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
            productos: result.body,
            //siempre que se monta el componente el modal tiene que estar cerrado
            modal: false,
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

  closeModal() {
    this.setState({
      modal: false,
      idToDelete: null,
    });
  }

  showModal(id) {
    this.setState({
      modal: true,
      idToDelete: id,
    });
  }

  handleClickDelete() {
    let parametros = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    //this.state.idToDelete se carga cuando abrimos el modal con showModal(vehiculo_id)
    const url = `http://localhost:8000/producto/${this.state.idToDelete}`;
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
          //al finalizar la eliminacion volvemos a invocar el componentDidMount() para recargar nuestro listado
          this.componentDidMount();
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

  render() {
    const filas = this.state.productos.map((producto, index) => {
      return (
        <tr key={index}>
          <td>{producto.nombre}</td>
          <td>{producto.descripcion}</td>
          <td>{producto.precio}</td>
          <td>
            <Link
              to={`/productos/edit/${producto.id}`}
              className="btn btn-primary"
            >
              <span class="material-symbols-outlined">edit</span>
            </Link>

            <button
              className="btn btn-danger"
              onClick={() => this.showModal(producto.id)}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </td>
        </tr>
      );
    });
    return (
      <>
        <div>
          <table className="table  table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{filas}</tbody>
          </table>
          <br />
          <Link to="/productos/edit" className="btn btn-info">
            Nuevo Producto
          </Link>
        </div>

        <Modal show={this.state.modal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación de Eliminacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Está seguro de eliminar el producto seleccionado?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.closeModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={this.handleClickDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Productos;
