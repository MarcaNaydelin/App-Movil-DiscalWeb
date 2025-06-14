import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Modal,TouchableOpacity,Dimensions,Animated} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/colors';
import MascotBubble from '../common/MascotBubble';

const { width, height } = Dimensions.get('window');

const EnhancedGameResults = ({ 
  visible, 
  score, 
  stars, 
  correctAnswers, 
  totalExercises, 
  onPlayAgain, 
  onGoBack,
  gameType = 'rocasMisteriosas'
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animatedValues] = useState({
    scale: new Animated.Value(0),
    starsOpacity: new Animated.Value(0),
    scoreOpacity: new Animated.Value(0),
    buttonsOpacity: new Animated.Value(0),
  });

  useEffect(() => {
    if (visible) {
      setShowAnimation(true);
      startAnimations();
    } else {
      resetAnimations();
    }
  }, [visible]);

  const startAnimations = () => {
    const { scale, starsOpacity, scoreOpacity, buttonsOpacity } = animatedValues;

    // Animación de entrada del modal
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(starsOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scoreOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(buttonsOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetAnimations = () => {
    Object.values(animatedValues).forEach(value => value.setValue(0));
    setShowAnimation(false);
  };

  const getPerformanceMessage = () => {
    const percentage = (correctAnswers / totalExercises) * 100;
    
    if (percentage === 100) {
      return {
        title: "¡PERFECTO!",
        message: "¡Eres increíble! Respondiste todo correctamente. ¡Eres un verdadero explorador!",
        mascotType: "celebration",
        color: Colors.feedback.correct,
        emoji: "🏆"
      };
    } else if (percentage >= 80) {
      return {
        title: "¡EXCELENTE!",
        message: "¡Lo hiciste genial! Solo te faltaron unos pocos. ¡Sigue así!",
        mascotType: "excited",
        color: Colors.primary.mint,
        emoji: "🌟"
      };
    } else if (percentage >= 60) {
      return {
        title: "¡BIEN HECHO!",
        message: "¡Buen trabajo! Con un poco más de práctica serás un experto.",
        mascotType: "happy",
        color: Colors.primary.yellow,
        emoji: "👍"
      };
    } else {
      return {
        title: "¡SIGUE INTENTANDO!",
        message: "¡No te rindas! Cada intento te hace más fuerte. ¡Inténtalo de nuevo!",
        mascotType: "thinking",
        color: Colors.primary.pink,
        emoji: "💪"
      };
    }
  };

  const performance = getPerformanceMessage();

  const renderStars = () => {
    return Array.from({ length: 3 }, (_, index) => (
      <Animated.View
        key={index}
        style={[
          styles.starContainer,
          {
            opacity: animatedValues.starsOpacity,
            transform: [{
              scale: animatedValues.starsOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, index < stars ? 1.2 : 0.8],
              })
            }]
          }
        ]}
      >
        <Ionicons
          name={index < stars ? "star" : "star-outline"}
          size={50}
          color={index < stars ? Colors.primary.yellow : "rgba(255, 255, 255, 0.3)"}
        />
      </Animated.View>
    ));
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      statusBarHidden={false}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ scale: animatedValues.scale }]
            }
          ]}
        >
          <LinearGradient
            colors={[performance.color, Colors.primary.purple]}
            style={styles.gradient}
          >
            {/* Header with Performance */}
            <View style={styles.header}>
              <Text style={styles.performanceEmoji}>{performance.emoji}</Text>
              <Text style={styles.performanceTitle}>{performance.title}</Text>
              <Text style={styles.gameCompleteText}>¡Juego Completado!</Text>
            </View>

            {/* Stars Section */}
            <View style={styles.starsSection}>
              <Text style={styles.starsLabel}>Tu puntuación:</Text>
              <View style={styles.starsContainer}>
                {renderStars()}
              </View>
              <Text style={styles.starsText}>
                {stars} de 3 estrella{stars !== 1 ? 's' : ''}
              </Text>
            </View>

            {/* Stats Section */}
            <Animated.View 
              style={[
                styles.statsSection,
                { opacity: animatedValues.scoreOpacity }
              ]}
            >
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Ionicons name="trophy" size={30} color={Colors.primary.yellow} />
                </View>
                <Text style={styles.statLabel}>Puntos</Text>
                <Text style={styles.statValue}>{score}</Text>
              </View>

              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Ionicons name="checkmark-circle" size={30} color={Colors.feedback.correct} />
                </View>
                <Text style={styles.statLabel}>Aciertos</Text>
                <Text style={styles.statValue}>{correctAnswers}/{totalExercises}</Text>
              </View>

              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Ionicons name="trending-up" size={30} color={Colors.primary.mint} />
                </View>
                <Text style={styles.statLabel}>Precisión</Text>
                <Text style={styles.statValue}>
                  {Math.round((correctAnswers / totalExercises) * 100)}%
                </Text>
              </View>
            </Animated.View>

            {/* Mascot Message */}
            <View style={styles.mascotContainer}>
              <MascotBubble
                message={performance.message}
                mascotType={performance.mascotType}
                theme="light"
                bubblePosition="center"
                mascotSize={{ width: 80, height: 80 }}
              />
            </View>

            {/* Buttons */}
            <Animated.View 
              style={[
                styles.buttonContainer,
                { opacity: animatedValues.buttonsOpacity }
              ]}
            >
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={onGoBack}
              >
                <Ionicons name="arrow-back" size={20} color={Colors.primary.purple} />
                <Text style={styles.buttonSecondaryText}>Volver</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={onPlayAgain}
              >
                <Ionicons name="refresh" size={20} color="white" />
                <Text style={styles.buttonPrimaryText}>Jugar de Nuevo</Text>
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    maxWidth: 400,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  gradient: {
    padding: 30,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  performanceEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  performanceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  gameCompleteText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  starsSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  starsLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  starContainer: {
    marginHorizontal: 8,
  },
  starsText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  mascotContainer: {
    marginBottom: 30,
    minHeight: 100,
    justifyContent: 'center',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    minHeight: 50,
  },
  buttonPrimary: {
    backgroundColor: 'white',
    marginLeft: 10,
  },
  buttonSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 10,
  },
  buttonPrimaryText: {
    color: Colors.primary.purple,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  buttonSecondaryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default EnhancedGameResults;