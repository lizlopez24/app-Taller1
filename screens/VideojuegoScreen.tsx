import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Insect {
  id: string;
  x: number;
  y: number;
}

export default function MainGameScreen() {
  const navigation = useNavigation();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [insects, setInsects] = useState<Insect[]>([]);
  const [animation] = useState(new Animated.Value(0));
  const insectImageUri = 'https://resources.bestfriends.org/sites/default/files/styles/large/public/2022-11/17_Desmond_LF_794A6656_video.jpg?itok=q4Zyy7HV';

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    generateInsects();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log('Ganaste');
    }
  }, [timeLeft]);

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
      <Text style={styles.scoreText}>Gato robados: {score}</Text>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0'
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 10
  },
  timeText: {
    fontSize: 18,
    marginBottom: 20
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
  }
});

