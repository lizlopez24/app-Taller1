import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function VideojuegoScreen() {

  const [puntaje, setPuntaje] = useState(0);
  const [tiempo, setTiempo] = useState(60);
  
  useEffect(() => {
    const temporizador = setInterval(() => {
      setTiempo(tiempo - 1);
      if (tiempo <= 0) {
        clearInterval(temporizador);
      }
    }, 1000);
    return () => {
      clearInterval(temporizador);
    };
  }, [tiempo]);
  
  const cazarInsecto = () => {
    setPuntaje(puntaje + 1);
  };

  return (
      <View>
      <ScrollView>
          <TouchableOpacity
            onPress={() => cazarInsecto()}>
            <Image source={{uri: 'https://c4.wallpaperflare.com/https://w7.pngwing.com/pngs/226/943/png-transparent-computer-mouse-house-mouse-free-content-cartoon-mouse-s-white-mammal-face.png/384/818/513/himalayas-mountains-landscape-nature-wallpaper-preview.jpg'}} />
          </TouchableOpacity>
      </ScrollView>
      <View>
        <Text>Puntaje: {puntaje}</Text>
      </View>
      <View>
        <Text>Tiempo restante: {tiempo}</Text>
      </View>
      <Text>VideojuegoScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})