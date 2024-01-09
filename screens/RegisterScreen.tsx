import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";


import { db } from "../config/Config";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';


export default function RegisterScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [usuario, SetUsuario] = useState("");

  function registro(correo: string, contrasena: string, usuario: string) {
    set(ref(db, "registros-nuevos/" + usuario), {
      email: correo,
      password: contrasena,
      user: usuario,
    });


    createUserWithEmailAndPassword(auth, correo, contrasena)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        //console.log("Registro exitoso");
        navigation.navigate('Login')
        setCorreo('')
        setContrasena('')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode)
        console.log(errorMessage)

        switch (errorCode) {
          case 'auth/weak-password':
            Alert.alert("ERROR", "Contraseña muy corta (minimo 6 caracteres)");
            setContrasena('')
            break;
          case 'auth/invalid-email':
            Alert.alert("ERROR", "Correo no valido");
            setCorreo('')
            break;
          case 'auth/missing-password':
            Alert.alert("ERROR", "Ponga una contraseña")
            break;
          case 'auth/missing-email':
            Alert.alert("ERROR", "Ponga un correo")
            break;
          default:
            Alert.alert("ERROR");
            break;
        }

      });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regístrate</Text>
      <Image
        source={{
          uri: "https://e7.pngegg.com/pngimages/858/581/png-clipart-profile-icon-user-computer-icons-system-chinese-wind-title-column-miscellaneous-service.png",
        }}
        style={styles.img}
      />
      <TextInput
        placeholder="Ingrese su correo"
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType="email-address"
        style={styles.input}
        value={correo}
      />
      <TextInput
        placeholder="Ingrese su nombre de usuario"
        onChangeText={(texto) => SetUsuario(texto)}
        style={styles.input}
      />
      <TextInput
        placeholder="Ingrese su contraseña"
        onChangeText={(texto) => setContrasena(texto)}
        style={styles.input}
        value={contrasena}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Confirme su contraseña"
        onChangeText={(texto) => setContrasena(texto)}
        style={styles.input}
        value={contrasena}
        secureTextEntry={true}
      />
      <Pressable
        style={styles.btn}
        onPress={() => registro(correo, contrasena, usuario)}
      >
        <Text>Registrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginTop: 60,
    marginBottom: 30,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#80d3ec",
    marginVertical: 30,
  },
  input: {
    width: 275,
    marginVertical: 20,
    backgroundColor: "white",
    color: "black",
    borderRadius: 5,
    paddingStart: 15,
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});
