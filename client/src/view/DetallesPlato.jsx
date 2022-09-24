import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import PedidosbaseContext from '../context/pedidos/pedidosContext';
import stylesGlobal from '../styles/stylesGlobal.jsx';
import FormularioPlato from '../component/FormularioPlato';

const DetallesPlato = () => {
  const navigation = useNavigation()
  const { plato, confirmarPedido } = useContext(PedidosbaseContext)
  //console.log(plato)
  const { nombre, categoria, description, imagen, precio, existencia } = plato
  const [cantidad, setCantidad] = useState(1);
  const [total, setTotal] = useState(0);

  const confirmarOrden = () => {

    const pedido = {
      ...plato,
      cantidad,
      total
    }
    confirmarPedido(pedido)
    //Navegar hacia el resumen
    navigation.navigate('resumenPedido')

  }

  return (
    <LinearGradient
      colors={['#0f0f0f', '#3d1515']}
      style={stylesGlobal.container}>
      <View style={[stylesGlobal.contenido, styles.top]}>
        <View style={[stylesGlobal.separator, styles.containerText]}>
          <Text style={[stylesGlobal.titulo]}>{nombre}</Text>
        </View>
        <View>
          <Image style={styles.image} source={{ uri: imagen }} />
        </View>
        <View style={[stylesGlobal.separator, styles.containerText]}>
          <View style={stylesGlobal.separator}>

            <Text style={styles.text}>{categoria}</Text>
          </View>
          <Text style={styles.text}>{description}</Text>
        </View>
      </View>

      <View style={[stylesGlobal.contenido, styles.bot]}>

        <FormularioPlato
          cantidad={cantidad}
          setCantidad={setCantidad}
          total={total}
          setTotal={setTotal}
          precio={precio}
          existencia={existencia}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => confirmarOrden()}
        >
          <Text style={styles.textBtn}>Agregar a pedidas</Text>
        </TouchableOpacity>

      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
  },
  bot: {
    marginBottom: 40
  },
  containerText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  text: {
    color: '#fcdc75',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 50,
    letterSpacing: 3
  },
  botText: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 30
  },
  btn: {
    backgroundColor: '#ffd344',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    color: '#1d1d1d',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',

  }
})

export default DetallesPlato;
