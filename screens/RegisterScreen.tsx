import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

//Firebase
import { db } from "../config/Config";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/Config";


export default function RegisterScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [usuario, setUsuario] = useState("");

  async function registro() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        correo,
        contrasena
      );
      const user = userCredential.user;
      navigation.navigate("Login");
      setCorreo("");
      setContrasena("");
      // Llama a la función guardar después de obtener el uid
      await guardar(user.uid, correo, contrasena, usuario);
    } catch (error) {
      handleRegistrationError(error);
    }
  }

  async function guardar(
    uid: string,
    correo: string,
    contrasena: string,
    usuario: string
  ) {
    try {
      await set(ref(db, "registros-nuevos/" + uid), {
        email: correo,
        password: contrasena,
        user: usuario,
      });
      console.log(uid);
    } catch (error) {
      console.error("Error en guardar:", error);
    }
  }

  async function compuesta() {
    await registro();
  }

  function handleRegistrationError(error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);

    switch (errorCode) {
      case "auth/weak-password":
        Alert.alert("ERROR", "Contraseña muy corta (mínimo 6 caracteres)");
        setContrasena("");
        break;
      case "auth/invalid-email":
        Alert.alert("ERROR", "Correo no válido");
        setCorreo("");
        break;
      case "auth/missing-password":
        Alert.alert("ERROR", "Ponga una contraseña");
        break;
      case "auth/missing-email":
        Alert.alert("ERROR", "Ponga un correo");
        break;
      case "auth/email-already-in-use":
        Alert.alert("ERROR", "Correo ya registrado");
        break;
      default:
        Alert.alert("ERROR");
        break;
    }
  }
  const [imagen, setImagen] = useState(
    "https://www.infobae.com/new-resizer/P0moRvtpTu7R0F34nLchAokqzqQ=/1200x900/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/OF3SZKCXHZADLOGT3V5KFAXG4E.png"
  );

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
      <View>
      <SubirImg/>
      </View>
      <Text></Text>
      <Text style={styles.title}>Regístrate</Text>
      <Image source={{ uri: imagen }} style={styles.img} />
      <Text style={{ margin: 7 }}>Sube una foto para tu perfil</Text>
      <Pressable style={styles.btnImg1} onPress={() => pickImage()}>
        <Text>Desde la galería</Text>
      </Pressable>
      <Pressable style={styles.btnImg2} onPress={() => takeImage()}>
        <Text>Usar cámara</Text>
      </Pressable>
      <TextInput
        placeholder="Ingrese su correo"
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType="email-address"
        style={styles.input}
        value={correo}
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
        onPress={() => compuesta()}
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
    backgroundColor: "#f8e8f9",
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
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 90,
  },
  btnImg1: {
    width: 115,
    height: 40,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#80d3ec",
    borderRadius: 4,
    marginLeft: -150,
  },
  btnImg2: {
    width: 110,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#80d3ec",
    borderRadius: 4,
    marginLeft: 150,
    marginTop: -40,
  },
});
