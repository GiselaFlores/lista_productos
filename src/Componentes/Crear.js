import {useNavigate } from "react-router-dom";
import React, {useState} from'react';
import {collection, addDoc} from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';
import {async} from '@firebase/util';

const Crear = () => {

    //1 declar los hooks

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const navigate = useNavigate();

    //2 referenciamos la bd

    const productosCollection = collection(db, "Productos");

    //3 declaramos una función almaceno

    const nuevo = async (e)=>{
        e.preventDefault();
        await addDoc(productosCollection, {Nombre: nombre, Precio: precio, Stock: stock});
        navigate('/');
    }

    //7 mostrar los datos del form

  return (
    <div className='container mt-2'>
        <div className='row'>
            <div className='col'>
                <h1>Crear Producto Nuevo</h1>

                <form onSubmit={nuevo}>
                    <div className="mb-3">
                        <label className="form-label">Nombre:</label>
                        <input 
                            value={nombre}
                            type="text"
                            className="form-control"
                            onChange={(e)=> setNombre(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                    <label className="form-label">Precio:</label>
                    <input 
                        value={precio}
                        type="text"
                        className="form-control"
                        onChange={(e)=> setPrecio(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                <label className="form-label">Stock:</label>
                <input 
                    value={stock}
                    type="text"
                    className="form-control"
                    onChange={(e)=> setStock(e.target.value)}
                />
                </div>

                <button type="submit" className="btn btn-primary mt-2">Agregar</button>

                </form>

            </div>
        </div>
    </div>
   
  )
}

export default Crear;