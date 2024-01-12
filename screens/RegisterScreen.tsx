import { Alert,Image,Pressable,StyleSheet,Text,TextInput,View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

//Firebase
import { db } from "../config/Config";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/Config";


export default function RegisterScreen({navigation}:any) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [usuario, setUsuario] = useState("");
  

  function registro(correo: string, contrasena: string, usuario: string) {
    set(ref(db, "registros-nuevos/" + usuario), {
      email: correo,
      password: contrasena,
      user: usuario,
    });

    Alert.alert("Mensaje", "Se registro tu usuario");

      createUserWithEmailAndPassword(auth, correo, contrasena)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        //console.log("Registro exitoso");
        navigation.navigate('Login')
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorCode)
        
        if ( errorCode=== 'auth/weak-password'){
          Alert.alert("Error", "La contraseña debe poseer 6 caracteres")
        }
        
      });
    }
  const [imagen, setImagen] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const takeImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };


  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regístrate</Text>
      <Image source={{ uri: imagen }}style={styles.img}/>
      <Text style={{margin:7}}>Sube una foto para tu perfil</Text>
      <Pressable
        style={styles.btnImg1}
        onPress={() => pickImage()}>
        <Text>Desde la galería</Text>
      </Pressable>
      <Pressable
        style={styles.btnImg2}
        onPress={() => takeImage()}>
        <Text>Usar cámara</Text>
      </Pressable>
      <TextInput
        placeholder="Ingrese su correo"
        onChangeText={(texto) => setCorreo(texto)}
        style={styles.input}
      />
      <TextInput
        placeholder="Ingrese su nombre de usuario"
        onChangeText={(texto) => setUsuario(texto)}
        style={styles.input}
      />
      <TextInput
        placeholder="Ingrese su contraseña"
        onChangeText={(texto) => setContrasena(texto)}
        style={styles.input}
      />
      <TextInput
        placeholder="Confirme su contraseña"
        onChangeText={(texto) => setContrasena(texto)}
        style={styles.input}
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
    fontSize: 25,
    marginTop: 60,
    marginBottom: 15,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#80d3ec",
    marginVertical: 10,
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
    borderColor: 'black',
    borderWidth: 1,
    borderRadius:5
  },
  btnImg1: {
    width: 115,
    height: 40,
    alignItems: 'center', 
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: "#80d3ec",
    borderRadius: 4,
    marginLeft: -150
  },
  btnImg2: {
    width: 110,
    height: 40,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: "#80d3ec",
    borderRadius: 4,
    marginLeft: 150,
    marginTop: -40
  }
});
