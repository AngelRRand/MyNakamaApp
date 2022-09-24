import { useReducer } from "react";
import PedidosbaseReducer from "./pedidosReducer";
import PedidosbaseContext from "./pedidosContext";
import { 
    SELECCIONAR_PRODUCTO, 
    CONFIMAR_ORDENAR_PLATILLO, 
    MOSTRAR_RESUMEN,
    ELIMINAR_PEDIDO,
    PEDIDO_ORDENADO
} from "../../types";

const PedidosbaseState = props =>{

    const initialState ={
        pedido: [],
        plato: null,
        total: 0,
        idpedido: ''
    }

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(PedidosbaseReducer, initialState)

    const seleccionarPlato = item =>{
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: item
        })
    }

    const confirmarPedido = pedido =>{
        dispatch({
            type: CONFIMAR_ORDENAR_PLATILLO,
            payload: pedido
        })
    }

    const enseñarResumen = total =>{
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    const eliminarPedido = id =>{
        dispatch({
            type: ELIMINAR_PEDIDO,
            payload: id
        })
    }

    const pedidoRealizado = id =>{
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }
    return(
        <PedidosbaseContext.Provider
            value={{
                pedido: state.pedido,
                plato: state.plato,
                total: state.total,
                idpedido: state.idpedido,
                seleccionarPlato,
                confirmarPedido,
                enseñarResumen,
                eliminarPedido,
                pedidoRealizado
            }}
        >
            {props.children}
        </PedidosbaseContext.Provider>
    )
}

export default PedidosbaseState