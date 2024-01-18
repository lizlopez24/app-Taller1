import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth } from '../config/Config';
import { db } from '../config/Config';

export default function PerfilScreen() {

    const [id, setid] = useState('')
    const [usuario, setUsuario] = useState<{ email: string, user: string } | null>(null);
    const [foto, setfoto] = useState<{ picture: string } | null>(null);

    let date = new Date()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log("Datos: ", uid)
                console.log(date)
                setid(uid);

                // Obtenemos el usuario específico
                const userRef = ref(db, 'registros-nuevos/' + uid);
                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        setUsuario({
                            email: userData.email,
                            user: userData.user
                        });
                        setfoto({
                            picture: userData.picture
                        })
                    } else {
                        console.log("No se encontraron datos para el usuario");
                    }
                }).catch((error) => {
                    console.error("Error al obtener datos:", error);
                });

            } else {
                setid('')
            }
        });
    }, [])


    return (
        <View style={styles.container}>
            <Image source={{ uri: foto?.picture }} style={styles.img} />
            {usuario && (
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 28 }}>{usuario.user}</Text>
                    <Text>Email: {usuario.email}</Text>
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f8e8f9'
    },
    img: {
        width: 200,
        height: 200,
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
        marginVertical: 30
    }
})