import { useReducer } from "react";
import firebase from "../../../firebase";
import FirebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";
import { OBTENER_PRODUCTOS } from "../../types";
import _ from 'lodash'
const FirebaseState = props =>{

    //console.log(firebase)
    const initialState ={
        menu: []
    }

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState)


    //Trae los productos
    const obtenerProductos = () =>{
        
        //Consultar firebase
        firebase.db.collection('productos').where('existencia', '==', true).onSnapshot(manejaSnap)

        function manejaSnap(snap){
            let plat = snap.docs.map(doc=>{
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });

            plat = _.sortBy(plat, 'categoria')
            dispatch({
                type: OBTENER_PRODUCTOS,
                payload: plat
            });
        }
    }

    return(
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState