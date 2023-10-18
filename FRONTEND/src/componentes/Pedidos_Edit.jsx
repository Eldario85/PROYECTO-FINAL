import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export class Internal_Pedidos_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      cantidad: "",
      talla: "",
      precio_unitario: "",
      fecha_del_pedido: "",
     
      modal: false,
    };
  }

  // como utilizamos el mismo formulario para crear y actualizar vehiculos, si no vinene ningun parametro significa que es un ALTA
  // pero si viene "vehiculo_id" por parametro (dentro de las this.props del constructor) significa que es una MODIFICACION
  // por lo que aprovechamos el ciclo de vida del componente para realizar un fetch al backend y traer los datos del vehiculo a ser
  // modificado si es que viene dicho dato por parametro
  componentDidMount() {
    if (this.props.params.id) {
      this.fetchPedido(this.props.params.id);
    }
  }

  fetchPedido = (id) => {
    fetch(`http://localhost:8000/pedido/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())

      .then((result) => {
        if (result.ok) {
          this.setState({
            id: result.body.detail.id,
            cantidad: result.body.detail.cantidad,
            talla: result.body.detail.talla,
            precio_unitario: result.body.detail.precio_unitario,
            fecha_del_pedido: result.body.detail.fecha_del_pedido,
            
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
  };

  // handler invocado por el evento onSubmit() del formulario, aqui hay dos caminos posibles, un POST para la creacion o un PUT para la edicion
  // eso lo diferenciamos mediante "this.props.params.vehiculo_id", acorde a su existencia debemos cambiar tanto la URL como el METHOD del fetch

  handleSubmit = (event) => {
    event.preventDefault();

    const { id, ...Pedidos } = this.state;

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:8000/pedido/${id}`
      : "http://localhost:8000/pedido";

    fetch(url, {
      method,
      body: JSON.stringify(Pedidos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
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
          this.props.navigate("/pedido");
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
                ? `Edicion del Pedido ${this.props.params.id}`
                : "Alta del Pedido"}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  id="floatingCantidad"
                  placeholder="Cantidad"
                  onChange={this.handleChange}
                  value={this.state.cantidad}
                  name="cantidad"
                />
                <label htmlFor="floatingCantidad">Cantidad</label>
              </div>
              <br />
              <select className="form-select"
                                id="talla"
                                aria-label="Default select example"
                                onChange={this.handleChange}
                                value={this.state.talla}
                                name='talla'
                            >
                                <option selected disabled>Talle</option>
                                <option value="1">Small</option>
                                <option value="2">Medium</option>
                                <option value="2">Large</option>
                                <option value="2">XLarge</option>
                                
                            </select>
                            <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPrecio"
                  placeholder="Precio"
                  onChange={this.handleChange}
                  value={this.state.precio_unitario}
                  name="Precio_unitario"
                />
                <label htmlFor="floatingPrecio">Precio $</label>
              </div>
              <br />

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="fecha_pedido"
                  placeholder="Fecha"
                  onChange={this.handleChange}
                  value={this.state.fecha_del_pedido}
                  name="fecha_del_pedido"
                />

                <label htmlFor="fecha_del_pedido">Fecha</label>
              </div>
              <br />
              <br />

              <input
                className="btn btn-primary"
                type="submit"
                value="Guardar"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Pedidos_Edit;

export function Pedidos_Edit() {
  const p = useParams();

  const navigate = useNavigate();

  return (
    <>
      <Internal_Pedidos_Edit navigate={navigate} params={p} />
    </>
  );
}
