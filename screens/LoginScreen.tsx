import { Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/Config'

export default function LoginScreen({ navigation }: any) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    function login(){
        signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //Accede a la navegacion
        navigation.navigate('Tab')
        setemail('')
        setpassword('')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
            case 'auth/invalid-email':
              Alert.alert("ERROR", "Credenciales incorrectas");
              break;
              case 'auth/invalid-credential':
              Alert.alert("ERROR", "Credenciales incorrectas");
              break;
            case 'auth/missing-password':
              Alert.alert("ERROR", "Ingrese la contraseña");
              break;
            case 'auth/wrong-password':
              Alert.alert("ERROR", "Contraseña incorrecta");
              break;
              case 'auth/user-not-found':
              Alert.alert("ERROR", "Usuario no encontrado, por favor, registrate!");
              break;
              case 'auth/too-many-requests':
              Alert.alert("ERROR", "Tu cuenta ha sido temporalmente desactivada debido a los multiples intentos fallidos de inicio de sesión, vuelve a intentarlo más tarde.");
              break;
            default:
              Alert.alert("ERROR");
              break;
          }
      });
      }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Image source={{ uri: 'https://e7.pngegg.com/pngimages/858/581/png-clipart-profile-icon-user-computer-icons-system-chinese-wind-title-column-miscellaneous-service.png' }} style={styles.img} />
            <TextInput placeholder='Ingrese su email' style={styles.input} 
            keyboardType='email-address'
            onChangeText={(texto)=>setemail(texto)}
            value={email}/>
            <TextInput placeholder='Ingrese su contraseña' style={styles.input}
            onChangeText={(texto)=>setpassword(texto)}
            value={password}/>

            <Pressable onPress={() => login()}
                style={styles.btn}>
                <Text>Iniciar Sesion</Text>
            </Pressable>

            <Text>¿Aún no tienes cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Registrarse')}>
                <Text style={styles.txt}>Regístrate!</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    img: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    txt: {
        fontWeight: 'bold'
    },
    title: {
        fontSize: 30,
        marginTop: 60,
        marginBottom: 30

    },
    input: {
        width: 275,
        marginVertical: 15,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 5,
        paddingStart: 15
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
    }
})