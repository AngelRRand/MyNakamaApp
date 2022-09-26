import React from 'react'

const Orden = ({orden}) => {
  return (
    <div className='sm:w-1/2 lg:w-1/3 px-2 mb-4'>
        <div className='p-3 shadow-md bg-slate-800'>
            <h1 className='text-pink-700 text-lg font-bold'>{orden.nombre}</h1>
        </div>
    </div>
  )
}

export default Orden