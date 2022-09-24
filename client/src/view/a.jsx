import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import PedidosbaseContext from '../context/pedidos/pedidosContext';
import stylesGlobal from '../styles/stylesGlobal.jsx';
import CardPedidos from '../component/CardPedidos';
import firebase from '../../firebase'


const ResumenPedido = () => {
  const { pedido, total, enseñarResumen, pedidoRealizado } = useContext(PedidosbaseContext)

  const navigation = useNavigation()
  useEffect(() => {
    calcularTotal()
  }, [pedido])

  const calcularTotal = () => {
    let newTotal = 0;
    newTotal = pedido.reduce((nuevo, articulo) => nuevo + articulo.total, 0)
    enseñarResumen(newTotal)
  }

  const confirmarPedido = () => {
    Alert.alert(
      '¿Deseas confirmar tu pedido?',
      'Revise bien si todo es correcto.',
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            //crear un pedido
            const pedidoObj = {
              tiempoentrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido,
              creado: Date.now()
            }

            //Escribir pedido en firebase
            try {
              const pedido = await firebase.db.collection('ordenes').add(pedidoObj)
              pedidoRealizado(pedido.id)

              //Navegar hacia el resumen
              navigation.navigate('progresoPedido')

            } catch (error) {
              console.log(error)
            }

          }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }

      ]
    )
  }
  const confirmarEliminar = (nombre, id) => {
    Alert.alert(
      `¿Deseas Eliminar ${nombre} de su lista?`,
      [
        {
          text: 'Confirmar',
          onPress: () => {
            //Eliminar del state
            eliminarPedido(id)
          }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }

      ]
    )
  }

  return (
    <LinearGradient
      colors={['#0f0f0f', '#3d1515']}
      style={stylesGlobal.container}>

      <View style={[stylesGlobal.contenido, styles.top]}>
        <View style={[stylesGlobal.separator, styles.containerText]}>
          <Text style={[stylesGlobal.titulo]}>Pedidos</Text>
        </View>
        <View style={stylesGlobal.separator}>

          <FlatList
            style={styles.flat}
            data={pedido}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => {
              return (

                <CardPedidos item={item} key={index} confirmarEliminar={confirmarEliminar} />
              )
            }}
          />
          <Button
            title="Seguir Pidiendo"
            color="#e99739"
            onPress={() => navigation.navigate('menu')}
          />
        </View>

      </View>
      <View style={[stylesGlobal.separator, styles.containerText, styles.bot]}>
        <View>
          <Text style={styles.text}>Total a pagar: {total}</Text>
        </View>

        <TouchableOpacity style={[stylesGlobal.btn, { backgroundColor: '#fcdc75', width: '100%', marginVertical: 20 }]} onPress={() => confirmarPedido()}>
          <Text style={[styles.text, { color: 'black' }]}>Ordenar Pedido</Text>
        </TouchableOpacity>
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
  bot: {
    marginTop: 70,
    marginBottom: 40
  },
  top: {
    flex: 1,
    marginBottom: 50
  },
  btn: {
    marginVertical: 30,
    height: 200
  }
});

export default ResumenPedido