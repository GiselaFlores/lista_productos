import './App.css';
import Mostrar from './Componentes/Mostrar';
import Crear from './Componentes/Mostrar';
import Editar from './Componentes/Mostrar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mostrar/>}/>
        <Route path='/crearproducto' element={<Crear/>}/>
        <Route path='/editarproducto' element={<Editar/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
