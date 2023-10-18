import "./App.css";
import { ToastContainer } from "react-toastify";
import Menu from "./Menu";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Productos from "./componentes/Productos";
import Productos_Edit from "./componentes/Productos_Edit";
import Clientes_Edit from "./componentes/clientes_Edit";
import Clientes from "./componentes/clientes";
import Pedidos from "./componentes/Pedidos";
import Pedidos_Edit from "./componentes/Pedidos_Edit";

function App() {
  return (
    <>
      <Menu />
      <ToastContainer />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/productos" element={<Productos />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/clientes/edit" element={<Clientes_Edit />}></Route>
          <Route path="/clientes/edit/:id" element={<Clientes_Edit />}></Route>
          <Route path="/clientes" element={<Clientes />}></Route>
          <Route path="/productos/edit" element={<Productos_Edit />} />
          <Route path="/productos/edit/:id" element={<Productos_Edit />} />
          <Route path="/pedido" element={<Pedidos />} />
          <Route path="/pedido/edit" element={<Pedidos_Edit />} />
        </Routes>
      </div>
      <header className="App-header bisque-background"></header>
    </>
  );
}

export default App;
