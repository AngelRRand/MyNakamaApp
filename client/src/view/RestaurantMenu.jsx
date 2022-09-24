import React, { useContext, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../component/Card';
import stylesGlobal from '../styles/stylesGlobal.jsx';
import FirebaseContext from '../context/firebase/firebaseContext.js';
import PedidosbaseContext from '../context/pedidos/pedidosContext.js';

const RestaurantMenu = () => {

  
  //contexto FireBase
  const { menu, obtenerProductos } = useContext(FirebaseContext);
  //contexto Pedidos
  const { seleccionarPlato } = useContext(PedidosbaseContext);

  useEffect(() => {
    obtenerProductos()
    //console.log(menu)
  }, []);

  const mostrarHeading = (categoria, i)=>{
    
    if(i>0){
      const categoriaAnterior = menu[i - 1].categoria;
      if(categoriaAnterior !== categoria){
        return(
          <View style={stylesGlobal.separator}>
            <Text style={{color: '#ffdc3d', fontSize: 20, textTransform:'uppercase'}}>{categoria}</Text>
          </View>
        )
      }
    }
    else{
      return(
        <View style={stylesGlobal.separator}>
          <Text style={{color: '#ffdc3d', fontSize: 20, textTransform:'uppercase'}}>{categoria}</Text>
        </View>
      )
    }
  }
  return (
    <LinearGradient
      colors={['#0f0f0f', '#3d1515']}
      style={stylesGlobal.container}>

      <View style={stylesGlobal.contenido}>
        <FlatList
          data={menu}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              
            <Card item={item} index={index} mostrarHeading={mostrarHeading} seleccionarPlato={seleccionarPlato}/>
            )
          }}
        />
      </View>

    </LinearGradient>
  )
}

export default RestaurantMenu