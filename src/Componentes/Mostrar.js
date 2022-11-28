import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {collection, getDocs, getDoc, deleteDoc, collection } from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const Mostrar = () => {
    //1 configuración de los hooks que van a mostrar

    const [products, setProducts] = useState([]);

    //2 referenciamos a la bd de firebase

    const productsCollection = collection(db, "products");

    //3 creamos la función para mostrar los documentos con asincronismo

    const getProducts = async () => {
        const data = await getDocs(productsCollection);
        console.log(data.docs);
    }

    //6 aplicamos el useEffect para la bajada 

    useEffect( ()=>{
        getProducts()
    }, []);

  return (
    <div>
      
    </div>
  )
}

export default Mostrar;
