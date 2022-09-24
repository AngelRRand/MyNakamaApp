import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
const CardPedidos = ({ item, confirmarEliminar }) => {

    const { nombre, imagen, total, cantidad, id } = item

    return (
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
                            <Text style={[styles.text]}>Cantidad: {cantidad}</Text>
                        </View>
                        <View>
                            <Text style={[styles.text]}>Precio: ${total}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.eliminar}
                onPress={() => confirmarEliminar(nombre, id)}
            >
                <Text style={styles.textElimin}>Eliminar</Text>
            </TouchableOpacity>
        </View>
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
        borderBottomWidth: 2,
        height: 150,
        borderTopRightRadius:5,
        borderTopLeftRadius:5
    },
    containerInfo: {
        alignItems: 'center',
        flex: 1,
    },
    image: {
        width: 200,
        height: 147,
        resizeMode: 'cover',
        borderTopLeftRadius: 5,
    },
    text: {
        color: '#fcdc75',
        textAlign: 'center',
        fontSize: 15,
    },
    spaceText: {
        height: 40,
    },
    name: {
        height: 60,
        marginTop: 10,
        width: '100%'
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
    },
    info: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 200
    },
    eliminar: {
        backgroundColor: '#ffd344',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textElimin:{
        color: '#1d1d1d',
        textAlign: 'center',
        fontSize: 15,
        fontWeight:'bold',

    }
})

export default CardPedidos;
