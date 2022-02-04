import './App.css';
import CadastroPiloto from './componentes/Piloto/CadastroPiloto';
import CadastroPista from './componentes/Pista/CadastroPista';
import CadastroHistorico from './componentes/historico/CadastroHistorico';
import './css/styleNavbar.css';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>


      <nav className="row navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className='col-md-8 offset-md-2 collapse navbar-collapse' id="navbarNavAltMarkup">
          <Link className="nav-item nav-link active link" to='/'>home</Link>
          <Link className="nav-item nav-link active link" to='/Piloto/CadastroPiloto'>Cadastro de Pilotos</Link>
          <Link className="nav-item nav-link active link" to='/Pista/CadastroPista'>Cadastro de Pistas</Link>

        </div>
      </nav>
      <main>
        <Routes>
          <Route exact path='/' element={<CadastroHistorico />} />
          <Route exact path='/Piloto/CadastroPiloto' element={<CadastroPiloto />} />
          <Route exact path='/Pista/CadastroPista' element={<CadastroPista />} />
        </Routes>
      </main>
    </div>

  );
}

export default App;
