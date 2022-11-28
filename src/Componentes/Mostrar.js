import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {collection, getDocs, getDoc, deleteDoc } from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const Mostrar = () => {
    //1 configuración de los hooks que van a mostrar

    const [productos, setProductos] = useState([]);

    //2 referenciamos a la bd de firebase

    const productosCollection = collection(db, "products");

    //3 creamos la función para mostrar los documentos con asincronismo

    const getProductos = async () => {
        const data = await getDocs(productosCollection);
        console.log(data.docs);
    }

    //6 aplicamos el useEffect para la bajada 

    useEffect( ()=>{
        getProductos()
    }, []);

  return (
    <div>
      
    </div>
  )
}

export default Mostrar;
