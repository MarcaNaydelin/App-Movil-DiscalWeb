import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '../context/AppContext';
import { AppColors } from '../styles/colors';
import MessageCloud from '../components/common/MessageCloud';
import GradientButton from '../components/common/GradientButton';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const { changeMascotMood } = useAppContext();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [manualAdvance, setManualAdvance] = useState(false);
  const [bounceAnim] = useState(new Animated.Value(0));
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const mascotScaleAnim = useRef(new Animated.Value(0.8)).current;
  const mascotEntryAnim = useRef(new Animated.Value(100)).current;
  const startButtonAnim = useRef(new Animated.Value(0)).current;
  const bubbleRefs = useRef([]);

  const welcomeMessages = [
    "¡Hola! Soy Discal, tu amigo dinosaurio.",
    "Te ayudaré a aprender matemáticas jugando.",
    "¡Vamos a comenzar nuestra aventura juntos!",
    "Toca el botón para comenzar a jugar."
  ];

  const mascotImages = {
    greeting: require('../../assets/img/mascota/mascota1.png'),
    talking: require('../../assets/img/mascota/mascota3.png'),
    excited: require('../../assets/img/mascota/mascota4.png'),
    happy: require('../../assets/img/mascota/mascota5.png')
  };

  const [currentMascotImage, setCurrentMascotImage] = useState(mascotImages.greeting);

  const animateMessageTransition = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentMessage(prev => (prev < welcomeMessages.length - 1 ? prev + 1 : prev));
      slideAnim.setValue(40);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const renderBubbles = () => {
    const bubbles = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 50 + 15;
      const startPositionX = Math.random() * SCREEN_WIDTH;
      const startPositionY = Math.random() * (SCREEN_HEIGHT + 200) + 200;
      const duration = Math.random() * 12000 + 18000;

      if (!bubbleRefs.current[i]) {
        bubbleRefs.current[i] = new Animated.Value(0);
      }

      const bubbleAnim = bubbleRefs.current[i];

      Animated.loop(
        Animated.timing(bubbleAnim, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
          delay: Math.random() * 2000,
        })
      ).start();

      const translateY = bubbleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [startPositionY, -100]
      });

      const opacity = bubbleAnim.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0.2, 0.5, 0]
      });

      bubbles.push(
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: i % 3 === 0 ? AppColors.primaryBlue : i % 3 === 1 ? AppColors.primaryPurple : AppColors.accentPink,
            left: startPositionX,
            transform: [{ translateY }],
            opacity,
            zIndex: 1
          }}
        />
      );
    }

    return bubbles;
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(mascotEntryAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(mascotScaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start();

    if (currentMessage === 0) {
      setCurrentMascotImage(mascotImages.greeting);
      changeMascotMood('greeting');
    } else if (currentMessage === 1) {
      setCurrentMascotImage(mascotImages.talking);
      changeMascotMood('talking');
    } else if (currentMessage === 2) {
      setCurrentMascotImage(mascotImages.excited);
      changeMascotMood('excited');
    } else {
      setCurrentMascotImage(mascotImages.happy);
      changeMascotMood('happy');
      Animated.spring(startButtonAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }

    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: -20,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    if (currentMessage === 0) {
      slideAnim.setValue(0);
    }

    const timer = currentMessage < welcomeMessages.length - 1 && !manualAdvance
      ? setTimeout(() => animateMessageTransition(), 8000)
      : null;

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentMessage, manualAdvance]);

  const handleScreenPress = () => {
    if (currentMessage < welcomeMessages.length - 1) {
      setManualAdvance(true);
      animateMessageTransition();
      setTimeout(() => setManualAdvance(false), 500);
    }
  };

  const navigateToGames = () => {
    Animated.sequence([
      Animated.timing(startButtonAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(startButtonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('GameMenu');
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.touchableContainer}
      onPress={handleScreenPress}
    >
      <LinearGradient 
        colors={[AppColors.primaryBlue, AppColors.primaryPurple]} 
        style={styles.container}
      >
        {renderBubbles()}

        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/img/logo/logoApp.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <MessageCloud 
            message={welcomeMessages[currentMessage]}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
          />

          <Animated.View 
            style={[
              styles.mascotContainer,
              { 
                transform: [
                  { translateY: bounceAnim },
                  { translateX: mascotEntryAnim },
                  { scale: mascotScaleAnim }
                ],
                zIndex: 10
              }
            ]}
          >
            <Image 
              source={currentMascotImage}
              style={styles.mascotImage} 
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        <Animated.View 
          style={[
            styles.startButtonContainer,
            {
              opacity: startButtonAnim,
              transform: [
                { scale: startButtonAnim },
                { translateY: startButtonAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0]
                }) }
              ]
            }
          ]}
        >
          <GradientButton
            text="¡COMENZAR!"
            onPress={navigateToGames}
            width="100%"
            height={70}
            fontSize={26}
          />
        </Animated.View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: -40,
  },
  logoContainer: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    width: 160,
    height: 60,
    zIndex: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  mascotContainer: {
    width: 260,
    height: 260,
  },
  mascotImage: {
    width: '100%',
    height: '100%',
  },
  startButtonContainer: {
    position: 'absolute',
    bottom: 80,
    width: '85%',
  },
});

export default WelcomeScreen;
