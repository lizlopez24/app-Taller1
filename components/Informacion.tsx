import { Button, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

export default function Informacion(prop:any) {
    const {isVisible, onClose, title, content}=prop;
  return (
    <Modal style={styles.modal} visible={isVisible} animationType='slide'
    transparent={true} onRequestClose={onClose}>
        <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.txt}>{content}</Text>
            <Button title='Cerrar' onPress={onClose} />
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    content:{
        padding:20,
        borderRadius:10,
        elevation:5,
        marginVertical:300,
        alignItems:'center'
    },
    modal:{
    width: "30%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'white'
    },
    title:{
        fontSize:20
    },
    txt:{

    }
})