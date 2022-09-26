import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../firebaseData'
const Orden = ({ orden }) => {

    const [tiempo, setTiempo] = useState(0);

    const { firebase } = useContext(FirebaseContext)

    const definirTiempo = (id) => {
        try {
            firebase.db.collection('ordenes').doc(id).update({
                tiempo
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='sm:w-1/2 lg:w-1/3 px-2 mb-4 p-5'>
            <div className='p-3 shadow-md bg-slate-800'>
                {orden.orden.map(plato => (
                    <p className='text-pink-400'>{plato.cantidad} {plato.nombre}</p>
                ))}
                <p className='text-pink-700 font-bold'>Total a pagar: $ {orden.total}</p>
                {orden.tiempoentrega === 0 && (
                    <div className='mb-4 mt-4'>
                        <label className='block text-white text-sm font-bold mb-2'>
                            Tiempo de entrega
                        </label>
                        <input
                            type='number'
                            className='shadow apparence-none border rounded w-full py-2 px-3 text-pink-600 leading-tight focus:outline-none focus:shadow-outline bg-slate-900'
                            min='1'
                            max='20'
                            placeholder='20'
                            value={tiempo}
                            onChange={e => setTiempo(parseInt(e.target.value))}
                        />
                        <button
                            onClick={() => definirTiempo(orden.id)}
                            type='submit'
                            className='p-2 mt-3 w-full text-white uppercase font-bold bg-pink-700 hover:bg-pink-900 inline-block'
                        >
                            Definir Tiempo
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orden