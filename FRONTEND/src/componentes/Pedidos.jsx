import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class Pedidos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Pedidos: [],
    
    };
    
  }

  componentDidMount() {
    let parametros = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    };

    fetch("http://localhost:8000/pedido", parametros)
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
          this.setState({
            pedidos: result.body,
            
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
      .catch((error) => console.log(error));
  }

 

  render() {
    const filas = this.state.Pedidos.map((pedido, index) => (
      <tr key={index}>
        <td>{pedido.id}</td>
        <td>{pedido.cantidad}</td>
        <td>{pedido.talla}</td>
        <td>{pedido.precio_unitario}</td>
        <td>{pedido.fecha_del_pedido}</td>
     
        <td>
          <Link
            to={{
              pathname: `/pedidos/edit/${pedido.id}`,
              state: { pedido },
            }}
            className="btn btn-primary"
          >
            <span className="material-symbols-outlined">edit</span>
          </Link>


        </td>
      </tr>
    ));
    return (
      <>
        <div>
          <table className="table  table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cantidad</th>
                <th>Talla</th>
                <th>Precio Unitario</th>
                <th>Fecha del pedido</th>
            
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{filas}</tbody>
          </table>
          <br />
          <Link to="/pedido/edit" className="btn btn-info">
            Nuevo Pedido
          </Link>
        </div>


      </>
    );
  }
}

export default Pedidos;
