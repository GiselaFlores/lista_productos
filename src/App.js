import './App.css';
import Mostrar from './Componentes/Mostrar';
import Crear from './Componentes/Crear';
import Editar from './Componentes/Editar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mostrar/>}/>
        <Route path='/crearproducto' element={<Crear/>}/>
        <Route path='/editarproducto/:id' element={<Editar/>}/>
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
