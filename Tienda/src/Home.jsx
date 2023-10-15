import React from "react";
import Titulos from "./componentes/Titulos";
import { PrimerComponente } from "./componentes/primerComponente";
import { SegundoArticulo } from "./componentes/primerComponente";
import { TercerArticulo } from "./componentes/primerComponente";

function Home() {
  return;
  <>
    <h1>Home</h1>
    <Titulos />

    <PrimerComponente />
    <SegundoArticulo />
    <TercerArticulo />
  </>;
}

export default Home;
