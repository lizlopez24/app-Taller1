import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Regístrate</Text>
            <Image source={{ uri: 'https://e7.pngegg.com/pngimages/858/581/png-clipart-profile-icon-user-computer-icons-system-chinese-wind-title-column-miscellaneous-service.png' }} style={styles.img} />
            <TextInput placeholder='Ingrese su correo' style={styles.input} />
            <TextInput placeholder='Ingrese su nombre de usuario' style={styles.input} />
            <TextInput placeholder='Ingrese su contraseña' style={styles.input}/>
            <TextInput placeholder='Confirme su contraseña' style={styles.input} />
            <Pressable style={styles.btn}>
                <Text>Registrar</Text>
            </Pressable>
            
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        marginTop: 60,
        marginBottom: 30

    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#80d3ec',
        marginVertical:30
    },
    input: {
        width: 275,
        marginVertical: 20,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 5,
        paddingStart: 15
    },
    img: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    }
})