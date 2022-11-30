import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import { collection, addDoc } from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';
import { async } from '@firebase/util';

const Crear = () => {
    //1 declaramos los hooks del componente

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const navigate = useNavigate();

    //2 referenciamos la bd con su coleccion

    const productosCollection = collection(db, "Productos");

    //3 declaramos una función para almacenar

    const nuevo = async (e) => {
        e.preventDefault()
        await addDoc(productosCollection, {Nombre: nombre, Precio: precio, Stock: stock });
        navigate('/');
    }

  return (
    <div className='container mt-2'>
        <div className='row'>
            <div className='col'>
               <h1>Crear Producto Nuevo</h1> 

               <form onSubmit={nuevo}>
                    <div className="mb-3">
                        <label className='form-label'>Nombre</label>
                        <input 
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>

                    <div className="mb-3">
                    <label className='form-label'>Precio</label>
                    <input 
                        value={precio}
                        onChange={(e)=>setPrecio(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                    </div>

                    <div className="mb-3">
                    <label className='form-label'>Stock</label>
                    <input 
                    value={stock}
                    onChange={(e)=>setStock(e.target.value)}
                    type="text"
                    className='form-control'
                    />
                    </div>
                </form> 

                <button type="submit" className='btn btn-primary mt-2'>Agregar</button>
            </div>
        </div>
    </div>
  )
}

export default Crear;