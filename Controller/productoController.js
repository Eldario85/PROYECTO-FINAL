require("rootpath")();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var productoDb = require("../Model/producto");


// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para PERSONAS-- 
// -------------------------------------------------------- 
app.get('/', BuscarTodos);
app.post('/', crear);
app.put('/:id', actualizar);
app.delete('/:id', borrar);




// -------------------------------------------------------- 
// ---------FUNCIONES UTILIZADAS EN ENDPOINTS ------------- 
// --------------------------------------------------------

//Listar todos los productos
function BuscarTodos(req, res) {
    productoDb.getAll(function (err, resultado) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

// -------------------------------------------------------- 
// Crear producto
function crear(req, res) {
    let producto = req.body;
    productoDb.create(producto, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

// -------------------------------------------------------- 
//Actualizar producto
function actualizar(req, res) {
    let producto = req.body;
    let id = req.params.id;
    productoDb.update(producto, id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

// -------------------------------------------------------- 
//Borrar producto
function borrar(req, res) {
    let id_producto_a_eliminar = req.params.id;
    productoDb.borrar(id_producto_a_eliminar, (err, result_model) => {
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



module.exports = app;