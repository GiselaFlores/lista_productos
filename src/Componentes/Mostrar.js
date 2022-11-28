import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { async } from '@firebase/util';
const MySwal = withReactContent(Swal);


const Mostrar = () => {
    //1 configuración de los hooks que van a mostrar

    const [productos, setProductos] = useState([]);

    //2 referenciamos a la bd de firebase

    const productosCollection = collection(db, "products");

    //3 creamos la función para mostrar los documentos con asincronismo

    const getProductos = async () => {
        const data = await getDocs(productosCollection)
        console.log(data.docs);

        setProductos(
        data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
        );
        console.log(productos);
    }

    // 4 creamos una función para eliminar los documentos

    const deleteProducto = async (id) => {
        const productosDoc = doc(db, "products", id);
        await deleteDoc(productosDoc);
        getProductos();
    }

    // 5 configuración para los alerts


    //6 aplicamos el useEffect para la bajada 

    useEffect( ()=>{
        getProductos()
    }, []);

    // 7 mostrar los datos en formato tabla
  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <div className='d-grid gap-2'>
                    <link to="/crearproducto" className='btn btn-secondary mt-2 mb-2' > Crear producto</link>
                </div>
                <table className='table table-dark table-hover'>
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Stock</th>
                            <th>Actiones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { productos.map((produc)=>(
                            <tr key={produc.id}>
                                <td key={produc.descripcion}></td>
                                <td key={produc.stock}></td>
                                <td>
                                    <link to={`/editarproducto/${produc.id}`} className="btn btn-light"><i class="fa-solid fa-trash"></i></link>
                                    <button><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )}

export default Mostrar;
