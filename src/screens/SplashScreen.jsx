import React, { useEffect, useState, useRef } from "react";
import { View, Image, StyleSheet, Animated, Text, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors } from "../styles/colors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.6));
  const [rotateAnim] = useState(new Animated.Value(0));
  const [textFadeAnim] = useState(new Animated.Value(0));
  const [glowAnim] = useState(new Animated.Value(0));

  const progressWidth = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const [loadingComplete, setLoadingComplete] = useState(false);

  const progressAnim = progressWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });
  
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0.9]
  });

  // Renderizar burbujas de fondo
  const renderBubbles = () => {
    const bubbles = [];
    
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 60 + 20;
      const startPositionX = Math.random() * SCREEN_WIDTH;
      const startPositionY = Math.random() * SCREEN_HEIGHT;
      const duration = Math.random() * 15000 + 20000;
      
      const bubbleAnim = useRef(new Animated.Value(0)).current;
      
      Animated.loop(
        Animated.timing(bubbleAnim, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
          delay: Math.random() * 3000,
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
            opacity:glowOpacity,
            zIndex: 1 // Importante: burbujas detrás del contenido
          }}
        />
      );
    }
    
    return bubbles;
  };

  useEffect(() => {
    // Animación de rebote continua
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animación de brillo para el logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animaciones del logo
    Animated.sequence([
      // Fade in y scale up con un efecto más dramático
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200, // Más lento para mejor efecto
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // Animación de rotación mejorada
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 0.08,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: -0.08,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0.05,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: -0.05,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      // Fade in del texto con ligero retraso
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación de la barra de progreso (más lenta)
    Animated.timing(progressWidth, {
      toValue: 100,
      duration: 6000,  // Aumentado a 6 segundos para una experiencia más completa
      useNativeDriver: false,
    }).start(() => {
      setLoadingComplete(true);
    });

    // Navegar a la pantalla de bienvenida después de un tiempo mayor
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 6500);  // Tiempo más largo para dar tiempo a ver la animación completa

    return () => clearTimeout(timer);
  }, []);

  // Obtener rotación para el efecto de wiggle
  const rotation = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-30deg", "30deg"],
  });

  // Función para ir a la siguiente pantalla al tocar
  const handleScreenTap = () => {
    if (loadingComplete) {
      navigation.replace("Welcome");
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={1}
      style={styles.container}
      onPress={handleScreenTap}
    >
      <LinearGradient 
        colors={[AppColors.primaryBlue, AppColors.primaryPurple]} 
        style={styles.gradient}
      >
        {/* Burbujas de fondo */}
        {renderBubbles()}
        
        {/* Logo con brillo */}
        <View style={styles.logoWrapper}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { rotate: rotation },
                  { translateY: bounceAnim },
                ],
              },
            ]}
          >
            <Image
              source={require("../../assets/img/logo/logoApp.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        <Animated.Text 
          style={[
            styles.loadingText, 
            { 
              opacity: textFadeAnim,
              transform: [{ translateY: textFadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })}]
            }
          ]}
        >
          Cargando el mundo de DiscalWeb...
        </Animated.Text>

        <View style={styles.progressBarContainer}>
          <Animated.View 
            style={[
              styles.progressBar, 
              { width: progressAnim }
            ]} 
          />
          <Animated.View 
            style={[
              styles.progressBarShine,
              {
                left: progressWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['-10%', '110%']
                })
              }
            ]} 
          />
        </View>

        <Animated.Text 
          style={[
            styles.versionText, 
            { 
              opacity: textFadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.7]
              })
            }
          ]}
        >
          Versión 1.0
        </Animated.Text>
        
        {/* Mensaje tap para continuar - aparece cuando la carga está completa */}
        {loadingComplete && (
          <Animated.Text 
            style={[
              styles.tapToContinueText,
              {
                opacity: Animated.multiply(textFadeAnim, new Animated.Value(0.8))
              }
            ]}
          >
            Toca para continuar
          </Animated.Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden',
  },
  logoWrapper: {
    position: 'relative',
    width: 280,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Logo por encima de las burbujas
  },
  logoContainer: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  logo: {
    width: '85%',
    height: '85%',
  },
  loadingText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    zIndex: 10, // Texto por encima de las burbujas
  },
  progressBarContainer: {
    position: 'relative',
    width: "75%",
    height: 18, // Ligeramente más grande
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
    marginTop: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 10, // Barra de progreso por encima de las burbujas
  },
  progressBar: {
    height: "100%",
    backgroundColor: AppColors.accentYellow,
    borderRadius: 15,
  },
  progressBarShine: {
    position: 'absolute',
    width: '10%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    transform: [{ skewX: '-20deg' }],
  },
  versionText: {
    color: "white",
    fontSize: 14,
    marginTop: 40,
    fontWeight: '500',
    zIndex: 10, // Texto por encima de las burbujas
  },
  tapToContinueText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
    bottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    zIndex: 10, // Texto por encima de las burbujas
  }
});

export default SplashScreen;