import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getDoc, doc, updateDoc} from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import { dbCollections } from '../firebaseConfig/collections';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Editar = () => {

    //1 estado para el form
    const [form, setForm] = useState({
        Nombre: "",
        Precio:"",
        Stock:""
    });

    const navigate = useNavigate();
    const {id} =useParams();

    //2 función para asignar valores al formulario

    const cambio = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    //3 alerta de guardado

    const alertaGuardado = ()=>{
        Swal.fire({
        title: 'Registro modificado y guardado',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
        });
    }

    //4 declaramos el función update

    const update = async (e)=>{
        e.preventDefault();
        const producto = doc(db, dbCollections.Productos, id);
        const data = {
            Nombre: form.Nombre,
            Precio: form.Precio,
            Stock: form.Stock
        };
        await updateDoc(producto, data);
        alertaGuardado();
        navigate("/");
    }

    //5 asincronismo de existencia con la bd

    const getProductoById = async (id) =>{
        const producto = await getDoc(doc(db, dbCollections.Productos, id));
        console.log(producto.data());

        if (producto.exists()){
            setForm({
                Nombre: producto.data().Nombre,
                Precio: producto.data().Precio,
                Stock: producto.data().Stock 
            });
        }
        else{
            console.log("no existe");
        }
    };

    //6 useEffect
    
    useEffect(()=>{
        getProductoById(id);
    }, [id])

    //7 estructura para mostrar

  return (
    <div className='container'>
        <div className='row'>
             <div className='col'>

             <h1 className='mt-3 text-light'>Editar el Producto</h1>

             <form onSubmit={update} className="mt-5">
                <div className='mb-4'>
                    <label className='form-label h3 text-light'>Nombre:</label>
                    <input 
                        name='Nombre'
                        value={form.Nombre}
                        type="text"
                        className='form-control w-50 m-auto'
                        onChange={cambio}
                    />
                </div>

                <div className='mb-4'>
                <label className='form-label h3 text-light'>Precio:</label>
                <input 
                    name="¨Precio"
                    value={form.Precio}
                    type="text"
                    className='form-control w-50 m-auto'
                    onChange={cambio}
                />
                </div>

                <div className='mb-3'>
                <label className='form-label h3 text-light'>Stock:</label>
                <input 
                    name="Stock"
                    value={form.Stock}
                    type="text"
                    className='form-control w-50 m-auto'
                    onChange={cambio}
                />
                </div>

                <button type="submit" className='btn btn-outline-light btn-lg mt-3'>Guardar</button>
             
             </form>
             </div>
        </div>
    </div>
  )
}

export default Editar;
