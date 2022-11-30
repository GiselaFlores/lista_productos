import {useNavigate, useParams } from "react-router-dom";
import React, {useState, useEffect} from'react';
import {getDoc, updateDoc, doc} from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';


const Editar = () => {

    //1 declarar hooks

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const navigate = useNavigate();
    const {id} = useParams();

    //2 declaramos la función update

    const update = async(e) => {
        e.preventDefault();
        const producto = doc(db, "Producto", id);
        const data = {Nombre: nombre, Precio: precio, Stock: stock};
        await updateDoc(producto, data);
        navigate("/");
    }

    //3 declarar el asincronismo del producto

    const getProductoById = async (id)=>{
        const producto = await getDoc(doc(db, "Producto", id));
        if(producto.exists){
            console.log(producto.data());
            setNombre(producto.data().nombre);
            setPrecio(producto.data().precio);
            setStock(producto.data().stock);
        }
        else{
            console.log("no existe");
        }
    }

    //4 declaramos el useEffect

    useEffect(()=>{
        getProductoById(id);
    }, [])

    //7 estructura a mostrar

  return (
    <div className='container mt-2'>
        <div className='row'>
            <div className='col'>
                <h1>Editar un Producto</h1>

                <form onSubmit={update}>
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

                <button type="submit" className="btn btn-primary mt-2">Enviar</button>

                </form>

            </div>
        </div>
    </div>
  )
}

export default Editar;

