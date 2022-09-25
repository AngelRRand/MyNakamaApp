import React, { useEffect, useState, useContext } from 'react'
import {FirebaseContext} from '../../firebaseData';
const Ordenes = () => {

  const { firebase } =  useContext(FirebaseContext);

  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const obtenerOrdenes = () =>{
      firebase.db.collection('ordenes').where('completado', '==', false).onSnapshot(manejarSnapshot)
    }
    obtenerOrdenes()
  }, []);

  function manejarSnapshot(snap){
    const ordenes = snap.docs.map(doc =>{
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    setOrdenes(ordenes)
  }
  return (
    <>
        <h1 className='text-3xl font-light text-white'>Ordenes</h1>
    </>
  )
}

export default Ordenes