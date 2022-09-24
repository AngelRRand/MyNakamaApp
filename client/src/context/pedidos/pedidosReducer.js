import {
    SELECCIONAR_PRODUCTO,
    CONFIMAR_ORDENAR_PLATILLO,
    MOSTRAR_RESUMEN,
    ELIMINAR_PEDIDO,
    PEDIDO_ORDENADO
} from "../../types";
export default (state, action) => {
    switch (action.type) {
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                plato: action.payload
            }
        case CONFIMAR_ORDENAR_PLATILLO:
            return {
                ...state,
                pedido: [...state.pedido, action.payload]
            }
        case MOSTRAR_RESUMEN:
            return {
                ...state,
                total: action.payload
            }
        case ELIMINAR_PEDIDO:
            return {
                ...state,
                pedido: state.pedido.filter(art => art.id !== action.payload)
            }
        case PEDIDO_ORDENADO:
            return {
                ...state,
                idpedido: action.payload
            }
        default:
            return state
    }
}