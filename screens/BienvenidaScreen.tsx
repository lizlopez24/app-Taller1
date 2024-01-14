import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function BienvenidaScreen({navigation}:any) {
  return (
    <ImageBackground style={styles.container} source={require("../assets/gatitos/gatitoInicioF.jpg")}>
      <Text style={styles.title}>¡Al fin! Alguien con quien jugar...</Text>
      <Text style={styles.txt}>¿Te gustaria jugar conmigo?</Text>
    <Button title='    Si    ' onPress={()=>navigation.navigate("Login")} color={'#80d3ec'} />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    title:{
        fontStyle:'italic',
        fontSize:25,
        marginTop:60
    },
    txt:{
        fontSize:20,
        marginBottom:40,
        marginTop:30
    }
})