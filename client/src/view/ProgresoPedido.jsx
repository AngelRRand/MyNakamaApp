import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import stylesGlobal from '../styles/stylesGlobal.jsx';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import PedidosbaseContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase'
const ProgresoPedido = () => {

  const { idpedido } = useContext(PedidosbaseContext)
  const [tiempo, setTiempo] = useState(0);
  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db.collection('ordenes').doc(idpedido).onSnapshot(function (doc) {
        setTiempo(doc.data().tiempoentrega)
      })
    }
    obtenerProductos()
  }, []);

  return (

    <LinearGradient
      colors={['#0f0f0f', '#3d1515']}
      style={stylesGlobal.container}>

      <View style={stylesGlobal.contenido}>
        {tiempo === 0 && (
          <>
            <Text style={styles.text}>Hemos recibido tu orden{idpedido}</Text>
            <Text style={styles.text}>Estamos calculando el tiempo de entrega</Text>
          </>
        )}
        {tiempo > 0 && (
          <>
            <Text style={styles.text}>Su orden estara lista en : {tiempo} minutos</Text>
          </>
        )}
      </View>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  containerText: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    fontSize: 22,
    color: '#fcdc75',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2
  },
});

export default ProgresoPedido