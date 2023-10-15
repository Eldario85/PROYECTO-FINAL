import "./App.css";
import { ToastContainer } from "react-toastify";
import Menu from "./Menu";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Productos from "./componentes/Productos";
import Productos_Edit from "./componentes/Productos_Edit";
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
          {/* <Route path="/reservas" element={<Reservas />}></Route>
          {/*<Route path="/texto/:text" element={<Texto />} />
          <Route path="/reloj" element={<Clock />} />
          <Route path="/boton" element={<Toggle />} />
          <Route path="/hook" element={<ComponenteClass />} />*/}
          <Route path="/productos/edit" element={<Productos_Edit />} />
          <Route
            path="/productos/edit/:producto_id"
            element={<Productos_Edit />}
          />
        </Routes>
      </div>
      <header className="App-header bisque-background"></header>
    </>
  );
}

export default App;
