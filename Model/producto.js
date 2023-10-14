require ("rootpath") ();

const mysql= require("mysql");
const configuracion = require('../config.json');

//inicializa la conexion entre el servidor y la base de datos
var connection = mysql.createConnection(configuracion.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("base de datos conectada");
    }
});

var productoDb={};

//crear producto
productoDb.create = function (producto, funCallback) {
    consulta = "INSERT INTO producto (nombre, descripcion, precio, stock_disponible) VALUES (?,?,?,?);";
    params = [producto.nombre, producto.descripcion, producto.precio, producto.stock_disponible];

    connection.query(consulta, params, (err, rows) => {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                funCallback({
                    message: "El producto ya fue registrado anteriormente",
                    detail: err
                });
            } else {
                funCallback({
                    message: "error diferente",
                    detail: err
                });
            }
        } else {
            funCallback(undefined, {
                message: `se creo el producto  ${producto.nombre}`,
                detail: rows
            });
        }
    });
}

//R = READ
productoDb.getAll = function (funCallback) {
    var consulta = 'SELECT * FROM producto';
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback({
                message: "ha ocurrido un error inesperado al buscar el producto",
                detail: err
            });
        } else {
            funCallback(undefined, rows);
        }
    });
}


// U = UPDATE
// personaController --> app.put('/', actualizar);
productoDb.update = function (producto, id, funCallback) {
    const consulta = "UPDATE producto SET nombre =?, descripcion= ?, precio =?, stock_disponible=? WHERE id = ?";
    const params = [producto.nombre, producto.descripcion, producto.precio, producto.stock_disponible, id];

    connection.query(consulta, params, (err, result) => {

        if (err) {
            if (err.code == "ER_DUP_ENTRY") { //dni duplicado
                funCallback({
                    message: "Los datos a insertar generan un producto duplicado",
                    detail: err
                });
            } else { //algun otro codigo de error
                funCallback({
                    message: "error diferente, analizar codigo error",
                    detail: err
                });
            }
        } else if (result.affectedRows == 0) { //persona a actualizar no encontrada
            funCallback({
                message: "No existe producto que coincida con el criterio de busqueda",
                detail: result
            });
        } else {
            funCallback(undefined, {
                message: `se modificó el producto  ${producto.nombre} ${producto.descripcion}`,
                detail: result
            });
        }
    });
}



// D = DELETE
// personaController --> app.post('/', borrar);
productoDb.borrar = function (id, funCallback) {
    const consulta = "DELETE FROM producto WHERE id = ?";
    connection.query(consulta, id, (err, result) => {
        if (err) {
            funCallback({ menssage: err.code, detail: err });
        } else {
            if (result.affectedRows == 0) {
                funCallback(undefined,
                    {
                        message: "no se encontro producto con el id ingresado",
                        detail: result
                    });
            } else {
                funCallback(undefined, { message: "producto eliminado", detail: result });
            }
        }
    });
}

module.exports= productoDb;