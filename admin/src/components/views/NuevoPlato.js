import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {FirebaseContext} from '../../firebaseData';
import FileUploader from 'react-firebase-file-uploader'

const NuevoPlato = () => {


  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlImg, setUrlImg] = useState(''); 


  const navigate = useNavigate();

  //Firebase context
  const { firebase } = useContext(FirebaseContext)
  console.log(firebase)

  //Validacion
  const formik = useFormik({
    initialValues: {
      nombre: '',
      precio: '',
      categoria: '',
      imagen: '',
      description: '',
    },
    validationSchema: Yup.object({
      nombre: Yup
        .string()
        .min(3, 'Los platos deben tener 3 caracteres')
        .required('El nombre del platillo es obligatorio'),
      precio: Yup
        .number()
        .min(1, 'Debes añadir un numero')
        .required('El precio del platillo es obligatorio'),
      categoria: Yup
        .string()
        .required('La categoria es obligatorio para crear u nuevo plato'),
      description: Yup
        .string()
        .min(10, 'La descripcion debe tener almenos 10 caracteres')
        .required('La descripcion es obligatorio para crearlo'),
    }),
    onSubmit: data => {
      try {
        data.existencia = true
        data.imagen = urlImg
        firebase.db.collection('productos').add(data)

        navigate('/menu')
      } catch (error) {
        console.log(error)
      }
    }
  })


  //Funciones Imagenes
  const handleUploadStart =()=>{
    setProgreso(0)
    setSubiendo(true)
  }

  const handleUploadError = error =>{
    setSubiendo(false)
    console.log(error)
  }

  const handleUploadSuccess = async nombre =>{
    setProgreso(100)
    setSubiendo(false)

    //Guardar la url
    console.log(nombre)

    const url = await firebase.storage.ref('productos').child(nombre).getDownloadURL()
    setUrlImg(url)
  }

  const handleProgress = progreso =>{
    setProgreso(progreso)
    console.log(progreso)
  }

  return (
    <>
      <h1 className='text-3xl font-light mb-3 text-white'>Agregar nuevo plato</h1>
      <div className='flex justify-center mt-10'>
        <div className='w-full max-w-3xl'>
          <form
            onSubmit={formik.handleSubmit}
          >
            <div className='mb-4'>
              <label className='block text-sm font-blod mb-2 text-white' htmlFor='nombre'>Nombre</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 bg-gray-900 leading-tight focus:outline-none focus:shadow-outline'
                id='nombre'
                type='text'
                placeholder='Pizza Napolitana'
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {
              formik.touched.nombre && formik.errors.nombre ? (
                <div className='bg-gray-900 border-l-4 border-pink-500 text-pink-700 p-2 mb-3' role='alert'>
                  <p className='font-bold '>Hubo un error:</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null
            }
            <div className='mb-4'>
              <label className='block text-sm font-blod mb-2 text-white' htmlFor='precio'>Precio</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 bg-gray-900 leading-tight focus:outline-none focus:shadow-outline'
                id='precio'
                type='number'
                placeholder='$100'
                min='0'
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {
              formik.touched.precio && formik.errors.precio ? (
                <div className='bg-gray-900 border-l-4 border-pink-500 text-pink-700 p-2 mb-3' role='alert'>
                  <p className='font-bold'>Hubo un error:</p>
                  <p>{formik.errors.precio}</p>
                </div>
              ) : null
            }

            <div className='mb-4'>
              <label className='block  text-sm font-blod mb-2 text-white' htmlFor='categoria'>Categoria</label>
              <select
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 bg-gray-900 leading-tight focus:outline-none focus:shadow-outline'
                id='categoria'
                name='categoria'
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value=''>-- Seleccione --</option>
                <option value='Desayuno'> Desayuno </option>
                <option value='Comida'> Comida </option>
                <option value='Cena'> Cena </option>
                <option value='Bebida'> Bebida </option>
                <option value='Postre'> Postre </option>
                <option value='Ensalada'> Ensalada </option>
              </select>
            </div>

            {
              formik.touched.categoria && formik.errors.categoria ? (
                <div className='bg-gray-900 border-l-4 border-pink-500 text-pink-700 p-2 mb-3' role='alert'>
                  <p className='font-bold'>Hubo un error:</p>
                  <p>{formik.errors.categoria}</p>
                </div>
              ) : null
            }

            <div className='mb-4'>
              <label className='block text-white text-sm font-blod mb-2 ' htmlFor='description'>Descripcion</label>
              <textarea
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 bg-gray-900 leading-tight focus:outline-none focus:shadow-outline h-40'
                id='description'
                placeholder='Pizza Napolitana'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {
              formik.touched.description && formik.errors.description ? (
                <div className='bg-gray-900 border-l-4 border-pink-500 text-pink-700 p-2 mb-3' role='alert'>
                  <p className='font-bold'>Hubo un error:</p>
                  <p>{formik.errors.description}</p>
                </div>
              ) : null
            }

            <div className='mb-4'>
              <label className='block text-white text-sm font-blod mb-2' htmlFor='imagen'>Imagen</label>
              <FileUploader
                accept='image/*'
                id='imagen'
                name='imagen'
                randomizeFilename
                storageRef={firebase.storage.ref('productos')}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </div>
            {
              subiendo && (
                <div className='h-12 relative w-full border'>
                  <div className='bg-pink-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center' style={{width: `${progreso}%`}}>
                    {progreso} %
                  </div>
                </div>
              )
            }
            {
              urlImg && (
                <p className='bg-pink-500 text-white p-3 t text-center my-5'>
                  La imagen se subio correctamente
                </p>
              )
            }
            <input
              type='submit'
              className='ml-3 mb-5 p-2 text-white uppercase font-bold bg-pink-600 hover:bg-pink-700 inline-block'
              value='Agregar platillo'
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default NuevoPlato