import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth } from '../config/Config';
import { db } from '../config/Config';
import { MaterialIcons } from '@expo/vector-icons';

export default function PerfilScreen({ navigation }: any) {

    const [id, setid] = useState('')
    const [editando, setEditando] = useState(false);
    const [usuarioNuevo, setUsuarioNuevo] = useState('');
    const [update, setUpdate] = useState(false);
    const [usuario, setUsuario] = useState<{ email: string, user: string } | null>(null);
    const [foto, setfoto] = useState<{ picture: string } | null>(null);

    let date = new Date()

    const noeditando = () => {
        setEditando(false)
        setUpdate(true)
        set(ref(db, "registros-nuevos/" + id + "/user"), usuarioNuevo);
    }

    const sieditando = () => {
        setEditando(true)
        setUpdate(true)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
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
        setUpdate(false)
    }, [update])

    function logout() {
        signOut(auth).then(() => {
            navigation.navigate('Bienvenida')
        }).catch((error) => {
            // An error happened.
        });
    }


    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', margin: 40 }}>
                {foto && (<Image source={{ uri: foto.picture }} style={styles.img} />)}
                {usuario && (
                    <View style={{ alignItems: 'center', margin: 12, flexDirection: 'row' }}>
                        {editando ? (
                            <TextInput
                                style={{ fontWeight: 'bold', fontSize: 28, marginRight: 12 }}
                                placeholder={usuario.user}
                                onChangeText={(texto: any) => setUsuarioNuevo(texto)}
                            />) :
                            (<Text style={{ fontWeight: 'bold', fontSize: 28, marginRight: 12 }}>{usuario.user}</Text>
                            )}
                        <TouchableOpacity
                            onPress={editando ? noeditando : sieditando}
                            style={{ borderRadius: 10, borderColor: '#000', borderWidth: 1 }}>
                            <MaterialIcons name={editando ? 'save' : 'create'} size={26} color={'#000'} />
                        </TouchableOpacity>
                    </View>
                )}
                {usuario && (
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Email: </Text>
                        <Text style={{ fontSize: 18 }}>{usuario.email}</Text>
                    </View>
                )}
            </View>
            <TouchableOpacity
                onPress={() => logout()}
                style={styles.button_model}>
                <Text style={{ color: '#fff' }}>
                    CERRAR SESIÓN
                </Text>
            </TouchableOpacity>
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
        resizeMode: 'contain',
        borderColor: '#505050',
        borderWidth: 2,
        borderRadius: 100
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
    },
    button_model: {
        position: 'absolute',
        width: '80%',
        height: 35,
        backgroundColor: '#b8b8ff',
        borderColor: '#5cbdbb',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        bottom: 60
    }
})