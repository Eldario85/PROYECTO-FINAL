// roothpath : manejo de rutas de otros modulos del proyecto
// express : modulo que permite gestionar y lanzar servidores
require("rootpath")();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var clienteDb = require("../Model/cliente");

// --------------------------------------------------------
// --rutas de escucha (endpoint) dispoibles para PERSONAS--
// --------------------------------------------------------
app.get("/", BuscarTodos);
app.post("/", crear);
app.put("/:id", actualizar);
app.delete("/:id", borrar);
app.get("/:id", getById);
app.get("/usuario/:id", getUserByCliente);

// --------------------------------------------------------
// ---------FUNCIONES UTILIZADAS EN ENDPOINTS -------------
// --------------------------------------------------------

//Listar todos los clientes
function BuscarTodos(req, res) {
  clienteDb.getAll(function (err, resultado) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(resultado);
    }
  });
}

// --------------------------------------------------------
// Crear cliente
function crear(req, res) {
  let cliente = req.body;
  clienteDb.create(cliente, (err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(resultado);
    }
  });
}

// --------------------------------------------------------
//Actualizar cliente
function actualizar(req, res) {
  let cliente = req.body;
  let id = req.params.id;
  clienteDb.update(cliente, id, (err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(resultado);
    }
  });
}

// --------------------------------------------------------
//Borrar Cliente
function borrar(req, res) {
  let id_persona_a_eliminar = req.params.id;
  clienteDb.borrar(id_persona_a_eliminar, (err, result_model) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (result_model.detail.affectedRows == 0) {
        res.status(404).send(result_model.message);
      } else {
        res.send(result_model.message);
      }
    }
  });
}

// --------------------------------------------------------
//Buscar usuario por cliente
function getUserByCliente(req, res) {
  clienteDb.getUserByCliente(req.params.id, (err, result_model) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result_model);
    }
  });
}

// --------------------------------------------------------
//Buscar por Id
function getById(req, res) {
  let id = req.params.id;
  clienteDb.getById(id, (err, result_model) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result_model);
    }
  });
}

// --------------------------------------------------------

module.exports = app;
