import React,{ useRef, useContext} from 'react'
import { FirebaseContext} from '../../firebaseData'

const Platillo = ({ platillo }) => {
    //Existencia Ref
    const existenciaRef = useRef(platillo.existencia)

    //Context de firebase para cambios en la db
    const {firebase} = useContext(FirebaseContext)
    const { nombre, precio, categoria, imagen, description, existencia, id } = platillo

    const actualizar = ()=>{
        const existencia = (existenciaRef.current.value === 'true')

        try {
            firebase.db.collection('productos').doc(id).update({
                existencia
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-full px-3 mb-4'>
            <div className='p-5 shadow-md bg-gray-800'>
                <div className='lg:flex'>
                    <div className='lg:w-5/12 xl:w-3/12'>
                        <img src={imagen} alt='plato' />
                        <div className='sm:flex sm:-mx-2'>
                            <label className='block mt-5 sm:w-2/4'>
                                <span className='block text-white'>Existencia</span>
                                <select 
                                className='bg-slate-900 text-white shadow border appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                                value={existencia}
                                ref={existenciaRef}
                                onChange={()=> actualizar()}
                                >
                                    <option className=' text-white' value='true'>Disponible</option>
                                    <option className=' text-white' value='false'>No Disponible</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className='lg:w-5/12 xl:w-8/12 pl-5'>
                        <p className='font-bold text-4xl text-pink-400 mb-4'>{nombre}</p>
                        <p className=' text-gray-300 mb-4'> Categoria: {''}
                            <span className='font-bold  text-gray-400'>{categoria.toUpperCase()}</span>
                        </p>
                        <p className=' text-gray-300 mb-4'> Precio: {''}
                            <span className=' text-gray-400'>{precio}</span>
                        </p>
                        <p className=' text-gray-300 mb-4'>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Platillo