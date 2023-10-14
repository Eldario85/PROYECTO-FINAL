import React from 'react';


function PrimerComponente() {
  const agregarAlCarrito = () => {
    // Lógica para agregar al carrito
  };

  const estiloComponente = {
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: 'bisque',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
  };



  return (
    <div style={{ ...estiloComponente, textAlign: 'center' }} className='contenedor-primercomponente'>
      <img
        className='imagen-primerComponente'
        src={require('../imagenes/remera-india-negra-con-celeste1-39a19ed1a780ed311816546933537159-640-0.jpg')}
        alt='foto de una remera negra'
      />

      <div className='Descripcion-del-articulo'>
        <p className='nombre-del-articulo'>Remera negra</p>
        <p className='Precio'>$500</p>
        <button onClick={agregarAlCarrito} className='boton-carrito'>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

function SegundoArticulo() {
  const agregarAlCarrito = () => {
    // Lógica para agregar al carrito
  };

  const estiloComponente = {
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: 'bisque',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
  };



  return (
    <div style={{ ...estiloComponente, textAlign: 'center' }} className='contenedor-segundoArticulo'>
      <img
        className='imagen-segundoArticulo'
        src={require('../imagenes/SET-DEPORTIVO-BLANCA.jpg')}
        alt='foto de una remera blanca'
      />

      <div className='Descripcion-del-articulo'>
        <p className='nombre-del-articulo'>Remera Blanca</p>
        <p className='Precio'>$600</p>
        <button onClick={agregarAlCarrito} className='boton-carrito'>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export { PrimerComponente, SegundoArticulo };
