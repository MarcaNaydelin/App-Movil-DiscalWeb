import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert,Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../styles/colors';
import { SHAPE_IMAGES, SHAPE_NAMES } from '../../../utils/gameConstants';
import { useAppContext } from '../../../context/AppContext';
import { useGameLogic } from '../../../hooks/useGameLogic';

// Componentes
import ShapeSelector from '../../../components/game/ShapeSelector';
import GameFeedback from '../../../components/game/GameFeedback';
import GameProgress from '../../../components/game/GameProgress';
import MascotBubble from '../../../components/common/MascotBubble';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 380;

const RocasMisteriosasScreen = ({ navigation }) => {
  const { completePrehistoricGame } = useAppContext();
  const {
    currentExercise,targetShape, shapeOptions, score, attempts, isCorrect,gameCompleted, correctAnswers, 
    handleShapeSelect, calculateStars, resetGame, getFeedbackMessage, progress, exerciseNumber, totalExercises,
  } = useGameLogic();

  const [selectedShape, setSelectedShape] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Manejar selección de forma
  const onShapeSelect = (shape) => {
    if (showFeedback) return;
    
    setSelectedShape(shape);
    setShowFeedback(true);
    setFeedbackMessage(getFeedbackMessage(shape));
    
    handleShapeSelect(shape);
    
    // Ocultar feedback después de un tiempo
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedShape(null);
    }, isCorrect ? 1500 : 2000);
  };

  // Manejar finalización del juego
  useEffect(() => {
    if (gameCompleted) {
      const stars = calculateStars();
      completePrehistoricGame('rocasMisteriosas', stars, score);
      
      setTimeout(() => {
        Alert.alert(
          '¡Juego Completado!',
          `¡Increíble trabajo, explorador!\n\nPuntuación: ${score}\nEstrella${stars !== 1 ? 's' : ''}: ${stars}/3\nAciertos: ${correctAnswers}/${totalExercises}`,
          [
            {
              text: 'Jugar de Nuevo',
              onPress: resetGame,
            },
            {
              text: 'Volver',
              onPress: () => navigation.goBack(),
              style: 'cancel',
            },
          ]
        );
      }, 1000);
    }
  }, [gameCompleted, calculateStars, score, correctAnswers, totalExercises, completePrehistoricGame, resetGame, navigation]);

  const getWelcomeMessage = () => {
    if (exerciseNumber === 1) {
      return `¡Hola, explorador! En estas rocas antiguas hay formas secretas. ¡Ayúdame a encontrar el ${SHAPE_NAMES[targetShape]}!`;
    }
    return `¡Ayúdame a encontrar el ${SHAPE_NAMES[targetShape]}!`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.mundo1.primary, Colors.mundo1.secondary]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={isSmallScreen ? 24 : 28} color="white" />
          </TouchableOpacity>
          
          <Text style={[styles.headerTitle, isSmallScreen && styles.headerTitleSmall]}>
            Rocas Misteriosas
          </Text>
          
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => {
              Alert.alert(
                'Cómo Jugar',
                'Encuentra la forma que te pide Dino-Amigo tocando la roca correcta. ¡Observa bien la forma objetivo en la parte superior!',
                [{ text: 'Entendido' }]
              );
            }}
          >
            <Ionicons name="help-circle" size={isSmallScreen ? 24 : 28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Progreso */}
        <GameProgress
          currentExercise={exerciseNumber}
          totalExercises={totalExercises}
          score={score}
          progress={progress}
        />

        {/* Forma Objetivo */}
        <View style={[styles.targetShapeContainer, isSmallScreen && styles.targetShapeContainerSmall]}>
          <Text style={[styles.targetShapeLabel, isSmallScreen && styles.targetShapeLabelSmall]}>
            Encuentra esta forma:
          </Text>
          <View style={[styles.targetShapeBox, isSmallScreen && styles.targetShapeBoxSmall]}>
            {targetShape && (
              <Image
                source={SHAPE_IMAGES[targetShape]}
                style={[styles.targetShapeImage, isSmallScreen && styles.targetShapeImageSmall]}
                resizeMode="contain"
              />
            )}
          </View>
          <Text style={[styles.targetShapeName, isSmallScreen && styles.targetShapeNameSmall]}>
            {targetShape ? SHAPE_NAMES[targetShape].toUpperCase() : ''}
          </Text>
        </View>

        {/* Mensaje de Dino-Amigo */}
        {!showFeedback && (
          <View style={styles.mascotContainer}>
            <MascotBubble
              message={getWelcomeMessage()}
              mascotType="thinking"
              theme="default"
              bubblePosition="right"
              mascotSize={isSmallScreen ? { width: 60, height: 60 } : { width: 80, height: 80 }}
            />
          </View>
        )}

        {/* Retroalimentación */}
        <GameFeedback
          isCorrect={isCorrect}
          message={feedbackMessage}
          showFeedback={showFeedback}
          targetShape={targetShape}
        />

        {/* Selector de Formas (Rocas) */}
        <View style={styles.selectorContainer}>
          <Text style={[styles.instructionText, isSmallScreen && styles.instructionTextSmall]}>
            Toca la roca con la forma correcta:
          </Text>
          <ShapeSelector
            shapes={shapeOptions}
            onSelect={onShapeSelect}
            selectedShape={selectedShape}
            correctShape={targetShape}
            showFeedback={showFeedback}
            disabled={showFeedback}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.overlay.medium,
  },
  helpButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.overlay.medium,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
  headerTitleSmall: {
    fontSize: 20,
    marginHorizontal: 15,
  },
  targetShapeContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  targetShapeContainerSmall: {
    marginVertical: 15,
  },
  targetShapeLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  targetShapeLabelSmall: {
    fontSize: 16,
    marginBottom: 10,
  },
  targetShapeBox: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 4,
    borderColor: Colors.mundo1.accent,
  },
  targetShapeBoxSmall: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 3,
  },
  targetShapeImage: {
    width: 80,
    height: 80,
    tintColor: Colors.mundo1.primary,
  },
  targetShapeImageSmall: {
    width: 65,
    height: 65,
  },
  targetShapeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.mundo1.light,
    marginTop: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  targetShapeNameSmall: {
    fontSize: 16,
    marginTop: 8,
  },
  mascotContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
    minHeight: height * 0.12,
    justifyContent: 'center',
  },
  selectorContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  instructionTextSmall: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default RocasMisteriosasScreen;