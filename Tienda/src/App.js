
import './App.css';
import {PrimerComponente, SegundoArticulo, TercerArticulo} from './componentes/primerComponente';
import Titulos from './componentes/Titulos';

function App() {
  return (
    
    <div className="App bisque-background" >
      <Titulos/>
      <div className='contenedor-componentes '>
        
      <PrimerComponente />
      <SegundoArticulo />
      <TercerArticulo />

      </div>

      <header className="App-header bisque-background"></header>
    </div>
  );
}

export default App;
