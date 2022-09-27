import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import stylesGlobal from '../styles/stylesGlobal.jsx';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import PedidosbaseContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase'
import Countdown from 'react-countdown'

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

  const renderer = ({minutes, seconds}) =>{
    return(
      <Text style={styles.tiempo}>{minutes}:{seconds}</Text>
    )
  }

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
            <Text style={styles.text}>Su orden estara lista en: </Text>
            <Text>
              <Countdown
                date={Date.now() + tiempo * 60000}
                renderer={renderer}
              />
            </Text>
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

  tiempo:{
    color: '#fcdc75',
    marginBottom:20,
    fontSize:60,
    textAlign:'center',
    marginTop:30
  }
});

export default ProgresoPedido