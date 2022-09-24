import React,{useState, useEffect, useContext} from 'react'
import { FirebaseContext} from '../../firebaseData'
import Platillo from '../ui/Platillo'

const Menu = () => {

  const [platillos, setPlatillos] = useState([]);
  const {firebase} = useContext(FirebaseContext)


  //Consultando la base de datos al cargar
  useEffect(() => {
    const obtenerPlatillos = () =>{
      firebase.db.collection('productos').onSnapshot(handleSnapshot);
    }
    obtenerPlatillos()
  }, []);

  function handleSnapshot(snapshot){
    const platillo = snapshot.docs.map( doc =>{
      return{
        id: doc.id,
        ...doc.data()
      }
    });
    //Guardando los resultados
    setPlatillos(platillo)
  }

  return (
    <>
      <h1 className='text-3xl font-light text-white mb-10'>Menu</h1>
      
      {
        platillos.map(p =>(
          <Platillo
            key={p.id}
            platillo={p}
          />
        ))
      }
    </>
  )
}

export default Menu