import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useState } from "react";
import { FlatList } from 'react-native-gesture-handler';


export default function PuntuacionScreen() {
  return (
    <View>

      <ImageBackground
      source={require("../assets/records.gif")}
      style={styles.imageBackground}
    >
      <View style={styles.subcontainer}>
      <Text style={styles.bold}>Puntaje Total</Text>
      <Text>════════ ⋆★⋆ ═════════</Text>
      </View>
    </ImageBackground>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fae1dd'
  },
  subcontainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    width:'80%',
    height:'90%',
    margin: 25
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 34
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
})