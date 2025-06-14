import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../../styles/colors';
import { GAME_INSTRUCTIONS } from '../../../utils/gameConstants';

// Importar hooks y componentes
import { useShadowsGameLogic } from '../../../hooks/useShadowsGameLogic';
import GameProgress from '../../../components/game/GameProgress';
import ShadowDisplay from '../../../components/game/ShadowDisplay';
import FlashlightSelector from '../../../components/game/FlashlightSelector';
import GameFeedback from '../../../components/game/GameFeedback';
import EnhancedGameResults from '../../../components/common/EnhancedGameResults';
import InstructionsModal from '../../../components/common/InstructionsModal';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 380;

const SombrasCambiantesScreen = ({ navigation }) => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const {
    // Estado del juego
    currentExercise,
    targetShape,
    targetRotation,
    targetScale,
    linternaOptions,
    revealedShapes,
    selectedLinterna,
    score,
    attempts,
    isCorrect,
    gameCompleted,
    correctAnswers,
    showShadow,
    
    // Funciones
    handleLinternaPress,
    calculateStars,
    resetGame,
    getFeedbackMessage,
    
    // Utilidades
    progress,
    exerciseNumber,
    totalExercises,
  } = useShadowsGameLogic();

  // Manejar feedback
  useEffect(() => {
    if (isCorrect !== null && selectedLinterna) {
      setFeedbackMessage(getFeedbackMessage(selectedLinterna));
      setShowFeedback(true);
      
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, isCorrect ? 1500 : 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isCorrect, selectedLinterna, getFeedbackMessage]);

  // Manejar selección de linterna
  const handleLinternaSelect = (linterna) => {
    handleLinternaPress(linterna);
  };

  // Cerrar instrucciones
  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  // Manejar reinicio del juego
  const handleRestart = () => {
    resetGame();
    setShowFeedback(false);
    setFeedbackMessage('');
  };

  // Manejar salida del juego
  const handleExit = () => {
    navigation.goBack();
  };

  if (gameCompleted) {
    return (
      <EnhancedGameResults
        score={score}
        correctAnswers={correctAnswers}
        totalQuestions={totalExercises}
        stars={calculateStars()}
        gameTitle="Sombras Cambiantes"
        onRestart={handleRestart}
        onExit={handleExit}
        gameTheme="cave"
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={Colors.primaryPurple}
        translucent={Platform.OS === 'android'}
      />
      
      <LinearGradient
        colors={[Colors.primaryPurple, Colors.primaryBlue]}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          {/* Header con progreso */}
          <View style={styles.headerContainer}>
            <GameProgress
              currentExercise={exerciseNumber}
              totalExercises={totalExercises}
              score={score}
              progress={progress}
            />
          </View>

          {/* Contenido principal */}
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Mostrar sombra objetivo */}
            <ShadowDisplay
              targetShape={targetShape}
              targetRotation={targetRotation}
              targetScale={targetScale}
              showShadow={showShadow}
              showShapeName={true}
            />

            {/* Selector de linternas */}
            <FlashlightSelector
              linternas={linternaOptions}
              revealedShapes={revealedShapes}
              onLinternaPress={handleLinternaSelect}
              selectedLinterna={selectedLinterna}
              disabled={isCorrect === true}
              showFeedback={showFeedback && isCorrect === false && attempts >= 1}
            />

            {/* Feedback del juego */}
            <GameFeedback
              isCorrect={isCorrect}
              message={feedbackMessage}
              showFeedback={showFeedback}
              targetShape={targetShape}
            />
          </ScrollView>
        </View>

        {/* Modal de instrucciones */}
        <InstructionsModal
          visible={showInstructions}
          onClose={handleCloseInstructions}
          instructions={GAME_INSTRUCTIONS.sombrasCambiantes}
          gameTitle="Sombras Cambiantes"
          mascotType="cave"
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryPurple,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  headerContainer: {
    paddingTop: isSmallScreen ? 15 : 20,
    paddingBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
});

export default SombrasCambiantesScreen;