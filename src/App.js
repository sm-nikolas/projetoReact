import './App.css';
import CadastroPiloto from './componentes/Piloto/CadastroPiloto';
import CadastroPista from './componentes/Pista/CadastroPista';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to='/'>Home</Link>
            <Link className="nav-item nav-link active" to='/Piloto/CadastroPiloto'>Cadastro de Pilotos</Link>
            <Link className="nav-item nav-link active" to='/Pista/CadastroPista'>Cadastro de Pistas</Link>
          </div>
        </div>
      </nav>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <main>
            <Routes>
              <Route exact path='/Piloto/CadastroPiloto' element={<CadastroPiloto />} />
              <Route exact path='/Pista/CadastroPista' element={<CadastroPista />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>

  );
}

export default App;
