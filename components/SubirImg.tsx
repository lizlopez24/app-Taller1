import { Alert, StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../config/Config";

const SubirImg = () => {
  const [imagen, setImagen] = useState("");

  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, "usuarios/" + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: "image/jpg",
      });

      console.log("La imagen se subió con éxito");
      Alert.alert("Mensaje", "Imagen subida con exito");

      // Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log("URL de desacarga de la imagen", imageURL);
    } catch (error) {
      console.error(error);
    }
  }

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
    <View>
      <Text style={styles.title}>Regístrate</Text>
      <Image source={{ uri: imagen }} style={styles.img} />
      <Text style={{  }}>Sube una foto para tu perfil</Text>
      <View style={{flexDirection:'row'}}>
      <Pressable style={styles.btnImg1} onPress={() => pickImage()}>
        <Text>Desde la galería</Text>
      </Pressable>
      <Pressable style={styles.btnImg2} onPress={() => takeImage()}>
        <Text>Usar cámara</Text>
      </Pressable>
      </View>
    </View>
  );
};

export default SubirImg;

const styles = StyleSheet.create({
  container: {
    flex:1,
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
    margin:15
  },
  btnImg2: {
    width: 110,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#80d3ec",
    borderRadius: 4,
    margin:15

  },
});
