import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Informacion from '../components/Informacion';
import { get, ref, set } from 'firebase/database';
import { auth, db } from '../config/Config';
import { onAuthStateChanged } from 'firebase/auth';

interface Insect {
  id: string;
  x: number;
  y: number;
}

export default function MainGameScreen({ navigation }: any) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [insects, setInsects] = useState<Insect[]>([]);
  const [animation] = useState(new Animated.Value(0));
  const [ismodalVisible, setismodalVisible] = useState(false)
  const [btn, setbtn] = useState(true)
  const insectImageUri = 'https://resources.bestfriends.org/sites/default/files/styles/large/public/2022-11/17_Desmond_LF_794A6656_video.jpg?itok=q4Zyy7HV';
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    generateInsects();

    return () => {
      clearInterval(interval);
      if (timeLeft === 0) {
        registro(score);
        navigation.navigate('Puntuaciones')
      }
    }
  }, [timeLeft, score]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUsuario(uid);
      }
    });
  }, []);

  const registro = async (score: number) => {
    if (usuario) {
      const userRef = ref(db, "registros-nuevos/" + usuario);
      try {
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          const newScore = userData.score ? userData.score + score : score;
          // Actualiza solo el puntaje dentro de los datos existentes
          set(ref(db, "registros-nuevos/" + usuario + "/score"), newScore);
        } else {
          console.error("Usuario no encontrado en la base de datos");
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    }
  };

  function reiniciar() {
    setScore(0)
    setTimeLeft(10)
    setbtn(true)
  }

  const toggleModal = () => {
    setismodalVisible(!ismodalVisible)
  }

  const generateInsects = () => {
    const newInsects = [];
    for (let i = 0; i < 10; i++) {
      newInsects.push({
        id: i.toString(),
        x: Math.floor(Math.random() * 300),
        y: Math.floor(Math.random() * 500)
      });
    }
    setInsects(newInsects);
  };

  const moveInsect = (insectId: string) => {
    const updatedInsects = insects.map(insect => {
      if (insect.id === insectId) {
        const newX = Math.floor(Math.random() * 300);
        const newY = Math.floor(Math.random() * 500);
        return { ...insect, x: newX, y: newY };
      }
      return insect;
    });
    setInsects(updatedInsects);
  };

  const captureInsect = (insectId: string) => {
    setScore(prevScore => prevScore + 1);
    moveInsect(insectId);

    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      animation.setValue(0);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Gatos robados: {score}</Text>
      <Text style={styles.timeText}>Tiempo restante: {timeLeft}</Text>
      <View style={styles.insectsContainer}>
        {insects.map(insect => (
          <TouchableOpacity
            key={insect.id}
            style={[styles.insect, { top: insect.y, left: insect.x }]}
            onPress={() => captureInsect(insect.id)}
          >
            <Image source={{ uri: insectImageUri }} style={styles.insectImage} />
          </TouchableOpacity>
        ))}
        <Animated.Image
          source={{ uri: insectImageUri }}
          style={[
            styles.animatedImage,
            {
              transform: [
                {
                  scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5]
                  })
                }
              ]
            }
          ]}
        />
        <Pressable onPress={() => reiniciar()} style={styles.btn} disabled={btn}>
          <Text>Reiniciar</Text>
        </Pressable>
      </View>
      <Informacion isVisible={ismodalVisible} onClose={toggleModal} title={"Acabó el juego"} content={score} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8e8f9'
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 10,
    fontStyle: 'italic'
  },
  timeText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  insectsContainer: {
    position: 'relative',
    width: '100%',
    height: 600
  },
  insect: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden'
  },
  insectImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  animatedImage: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'cover'
  },
  btn: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#80d3ec',
    marginHorizontal: 145
  }
});
