import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getDoc, updateDoc, doc} from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

const Editar = () => {

    //1 declaro hooks

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const navigate = useNavigate();
    const {id} = useParams();

    //2 declaramos la funcion de actualizado update
    
    const update = async (e) => {
        e.preventDefault();
        const producto = doc(db, "Productos", id);
        const data = {Nombre:nombre, Precios: precio, Stock: stock};
        await updateDoc(producto, data);
        navigate("/");

    }

    //3 declaramos la funcion asincronica para el producto

    const getProductoById = async (id) =>{
        const producto = await getDoc(doc(db, "Productos", id));
        if(producto.exist()){
            console.log(producto.data());
            setNombre(producto.data().nombre);
            setPrecio(producto.data().precio);
            setStock(producto.data().stock);
        }
        else{
            console.log("no existe");
        }
    }

    //4 declaramos useEffect

    useEffect(()=>{
        getProductoById(id);
    }, [])

  return (
    <div className='container mt-2'>
        <div className='row'>
            <div className='col'>
               <h1>Editar Producto Nuevo</h1> 

               <form onSubmit={update}>
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

                <button type="submit" className='btn btn-primary mt-2'>Editar</button>
            </div>
        </div>
    </div>
  )
}

export default Editar;
