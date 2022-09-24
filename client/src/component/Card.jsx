import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native'

const Card = ({ item, index, mostrarHeading, seleccionarPlato }) => {

    const { nombre, categoria, imagen, precio, existencia } = item
    /* console.log(index) */
    const navigation = useNavigation()
    return (
        <>
        {
            mostrarHeading(categoria, index)
        }
        <TouchableOpacity
            onPress={()=> {
                seleccionarPlato(item)
                navigation.navigate('detallesPlato')
            }}
        >

        <View style={styles.container}>
            <View style={styles.contenido}>

                <View>
                    <Image style={styles.image} source={{ uri: imagen }} />
                </View>
                <View style={styles.containerInfo}>
                    <View style={[styles.spaceText, styles.name]}>
                        <Text style={[styles.text, styles.titulo]}>{nombre}</Text>
                    </View>
                    <View style={[styles.spaceText, styles.info]}>
                        <View>
                            <Text style={[styles.text]}>$ {precio}</Text>
                        </View>
                        <View>
                            {existencia === true ? 
                            <Text style={{color:'#65ff6c'}}>Disponible</Text>
                            : 
                            <Text style={{color:'#ff4e4e'}}>No Stock</Text> 
                            }
                        </View>
                    </View>
                </View>
            </View>
        </View>
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
    },
    contenido: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ffd344',
        borderBottomWidth:2,
        height: 150,
        borderRadius:5
    },
    containerInfo: {
        alignItems: 'center',
        flex: 1,
    },
    image: {
        width: 200,
        height: 147,
        resizeMode: 'cover',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5
    },
    text: {
        color: '#fcdc75',
        textAlign: 'center',
        fontSize:20,
    },
    spaceText: {
        height: 40,
    },
    name: {
        height: 60,
        marginTop: 10,
    },
    titulo: {
        fontSize: 20,
        fontWeight:'bold',
        letterSpacing:2
    },
    info: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 200
    }
})

export default Card;
