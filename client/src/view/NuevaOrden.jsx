import React from 'react';
import stylesGlobal from '../styles/stylesGlobal.jsx';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'

const NuevaOrden = () => {

  const navigation = useNavigation()

  return (
    <>
      <LinearGradient
        colors={['#0f0f0f', '#3d1515']}
        style={stylesGlobal.container}>
        <View style={[stylesGlobal.contenido, styles.contenido]}>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('menu')}
          >
            <Text style={styles.textBtn}>Menu</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  contenido: {
    flexDirection: 'column',
    justifyContent: 'center'
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
    fontSize: 25,
    fontWeight: 'bold',

  }
})
export default NuevaOrden