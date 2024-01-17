import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, onValue } from "firebase/database";
import { auth } from '../config/Config';
import { db } from '../config/Config';


export default function PuntuacionScreen() {

  
  const [id, setid] = useState('')
  const [datos, setDatos] = useState([])
  let date = new Date()

  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if (user) {

              const uid = user.uid;
              console.log("Datos: ", uid)
              console.log(date)
              setid(uid)
              // ...
          } else {
              setid('')
          }
      });
      
      const starCountRef = ref(db, 'registros-nuevos/' + id);
      onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          const dataTemp: any = Object.keys(data).map((id) => ({
              id, ...data[id]
          }))
          setDatos(dataTemp)
      });
  }, [])
  
  type usuario = {
      email: string,
      user: string,
      score: string
  }

  return (
    <View>

      <ImageBackground
        source={require("../assets/records.gif")}
        style={styles.imageBackground}
      >
        <View style={{display:'flex', justifyContent:'center', marginLeft:40}}>
        <View style={styles.subcontainer}>
          <Text style={styles.bold}>👑Puntaje Total👑</Text>
          <Text>══════════ ⋆★⋆ ═══════════</Text>
          <FlatList
                data={datos}
                renderItem={({ item }: { item: usuario }) => (
                    <View>
                        <View style={styles.onerow}>
                            <Text style={{marginRight:50, fontSize:16}}>user: {item.user}</Text>
                            <Text style={{fontSize:16}}>{item.score}</Text>
                        </View>
                        <Text></Text>
                    </View>
                )}
            />
        </View>
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
    width: '90%',
    height: '90%'
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 34
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  onerow: {
    flexDirection: 'row',
    justifyContent:'space-between'
},
})