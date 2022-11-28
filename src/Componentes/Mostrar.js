import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import {async} from '@firebase/util';
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


const Mostrar = () => {

    // 1 configuración de los hook de mostrar 

    const [productos, setProductos] = useState([]);

    // 2 referenciamos a la db de firebase

    const productosColletion = collection(db, "Productos");

    // 3 creamos la función para mostrar los documentos con asincronismo

    const getProductos = async () => {
        const data = await getDocs(productosColletion)
        console.log(data.docs)

        setProductos(
            data.docs.map( (doc)=>({id:doc.id}))
        );
        console.log(productos);
    }

    // 4 crear la función para eliminar registros

    const deleteProducto = async (id) =>{
        const productoDoc = doc(db, "Productos", id);
        await deleteDoc(productoDoc);
        getProductos();
    }

    //5 configuración sweetalert


    //6 declaramos el useeffect

    useEffect( ()=> {
        getProductos();
    }, [])


    //7 mostrar datos estructura

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <div className='d-grid gap-2'>
                    <link to="/crearproducto" className='btn btn-secondary mt-2 mb-2' ><i className="fa-solid fa-plus"></i></link>
                </div>
                <table className='table table-dark table-hover'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Actiones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { productos.map((produc)=>(
                            <tr key={produc.id}>
                                <td key={produc.Nombre}></td>
                                <td key={produc.Precio}></td>
                                <td key={produc.Stock}></td>
                                <td>
                                    <Link to={`/editarproducto/${produc.id}`} className="btn btn-light"><i className="fa-solid fa-pen-to-square"></i></link>
                                    <button><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Mostrar;
