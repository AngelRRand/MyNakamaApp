import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import stylesGlobal from '../styles/stylesGlobal.jsx';
import { AntDesign } from '@expo/vector-icons';
const FormularioPlato = ({cantidad, setCantidad, total, setTotal, precio, existencia}) => {

  
  //Calcular el total a pagar 

  const calcularTotal = () => {
    const totalPagar = precio * cantidad
    setTotal(totalPagar)
  }

  useEffect(() => {
    calcularTotal()
  }, [cantidad]);

  const restarUno = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      setCantidad(nuevaCantidad)
    }
  }
  const sumarUno = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    setCantidad(nuevaCantidad)
  }
  return (
    <>
      <View style={[stylesGlobal.separator, styles.containerText]}>
        <Text style={styles.text}>El precio es de: {total}</Text>
        {existencia ?
            <Text style={{ color: '#65ff6c', fontSize: 20, letterSpacing: 3}}>Disponible</Text>
            :
            <Text style={{ color: '#ff4e4e', fontSize: 20, letterSpacing: 3}}>No Stock</Text>
          }
      </View>
      <View style={[stylesGlobal.separator, styles.containerPlus]}>
        <Pressable style={stylesGlobal.btn} onPress={() => restarUno()}>
          <AntDesign name="minus" size={30} color="#fcdc75" />
        </Pressable>
        <TextInput
          value={cantidad.toString()}
          onChangeText={(cant) => setCantidad(cant)}
          keyboardType='numeric'
          style={styles.inputNum}
        />
        <Pressable style={stylesGlobal.btn} onPress={() => sumarUno()}>
          <AntDesign name="plus" size={30} color="#fcdc75" />
        </Pressable>
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  containerText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerPlus: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 30
  },
  inputNum: {
    color: '#fcdc75',
    borderBottomColor: '#fcdc75',
    borderBottomWidth: 2,
    height: 50,
    width: 100,
    textAlign: 'center',
    fontSize:30
  },
  text: {
    color: "#fcdc75",
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 3
  }
})

export default FormularioPlato