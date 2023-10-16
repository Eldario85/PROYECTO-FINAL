import React from "react";

export default function Home() {
  return (
    <>
      {" "}
      <h1>Algunos productos</h1>
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
          <div class="card">
            <img
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/401778e50ef4449d9656d40e9346b8af_9366/Camiseta_Titular_River_Plate_23-24_Blanco_HT3679_01_laydown.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Camiseta River Temp 23-24</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img
              src="https://pbs.twimg.com/media/CQfjMNEWUAA3BFc.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Camiseta Independiente</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img
              src="https://sporting.vteximg.com.br/arquivos/ids/201295-1000-1000/1640020-000-1.jpg?v=637152942987430000"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Camiseta Racing</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img
              src="https://th.bing.com/th/id/R.04db5a5b8c9e05b3a9837a1f060f333c?rik=EgQrPmmAjoYuqg&riu=http%3a%2f%2fwww.maillots-football.com%2fmedia%2f47528%2fboca-juniors-thuisshirt-2021-2022.jpg&ehk=DB0hT7CU9B7hEAtcMkcrFbYs%2bz1QBD0ncpeRQ9p%2bFYk%3d&risl=&pid=ImgRaw&r=0"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Camiseta Boca</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer>Sobre Nosotros</footer>
    </>
  );
}
