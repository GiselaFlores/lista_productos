import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import {async} from '@firebase/util';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const Mostrar = () => {

    //1 configuración de los hook de mostrar
    const productosCollection = collection(db, "Productos");

    const [productos, setProductos] = useState([]);

    //2 referenciar la db de firebase


    //3 creamos la funcionabilidad para mostrar los documentos con asincronismo

    const getProductos = async ()=> { 
        const data = await getDocs(productosCollection); 
        console.log(data.docs);
 
        setProductos(
           data.docs.map((doc)=>({...doc.data(), id:doc.id}))
        ); 
       
    }
    useEffect(()=>{
        getProductos();
        
    }, [])
    //4 declaración función delete para eliminar registros
    console.log(productos);
    const deleteProducto = async (id)=>{
        const productoDoc = doc(db, "Productos", id);
        await deleteDoc(productoDoc);
        getProductos();
    }

    //5 configuración sweetalert
    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Vas a eliminar el producto?',
            text: "Seguro de querer eliminarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
        }).then((result) => {
            if (result.isConfirmed) {
            deleteProducto(id);
            Swal.fire(
                'Borrado',
                'El producto fue eliminado.',
                'Listo'
            )
            }
        })

    }

    //6 declaramos el useEffect
 


    //7 mostrar datos en estructura

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <div className='d-grid gap-2'>
                    <Link to="/crearproducto" className='btn btn-outline-light btn-lg mt-3 mb-4 w-25' >Crear Nuevo Producto  <i className="fa-solid fa-plus"></i></Link>
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
                    <tbody className='text-light'>
                        { productos.map((produc)=>(
                            <tr key={produc.id}>
                                <td key={produc.Nombre} className='text-light'>{produc.Nombre || ''}</td>
                                <td key={produc.Precio} className='text-light'>{produc.Precio || ''}</td>
                                <td key={produc.Stock} className='text-light'>{produc.Stock || ''} </td>
                                <td>
                                    <Link to={`/editarproducto/${produc.id}`} className="btn btn-light"><i className="fa-solid fa-pen-to-square"></i></Link>
                                    <button onClick={()=>{confirmDelete(produc.id)}} className="bg-danger"><i className="fa-solid fa-trash "></i></button>
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