import React from 'react'

const Orden = ({orden}) => {
    console.log((orden))
  return (
    <div className='sm:w-1/2 lg:w-1/3 px-2 mb-4'>
        <div className='p-3 shadow-md bg-slate-800'>
            <h1 className='text-pink-700 text-lg font-bold'>{orden.id}</h1>
            {orden.orden.map(plato =>(
                <p className='text-pink-400'>{plato.cantidad} {plato.nombre}</p>
            ))}
            <p className='text-pink-700 font-bold'>Total a pagar: $ {orden.total}</p>
            {orden.tiempoentrega === 0 && (
                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2'>
                        Tiempo de entrega
                    </label>
                    <input
                        type='number'
                        className='shadow apparence-none border rounded w-full py-2 px-3 text-pink-600 leading-tight focus:outline-none focus:shadow-outline'
                        min='1'
                        max='20'
                    />
                </div>
            )}
        </div>
    </div>
  )
}

export default Orden