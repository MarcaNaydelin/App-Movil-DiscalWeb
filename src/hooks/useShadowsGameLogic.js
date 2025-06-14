import { useState, useEffect, useCallback } from 'react';
import { ADVANCED_SHAPES, DISTRACTOR_SHAPES, SHAPE_NAMES, SOMBRAS_CAMBIANTES_CONFIG } from '../utils/gameConstants';

export const useShadowsGameLogic = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [targetShape, setTargetShape] = useState(null);
  const [targetRotation, setTargetRotation] = useState(0);
  const [targetScale, setTargetScale] = useState(1);
  const [linternaOptions, setLinteranaOptions] = useState([]);
  const [revealedShapes, setRevealedShapes] = useState({});
  const [selectedLinterna, setSelectedLinterna] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showShadow, setShowShadow] = useState(true);

  // Generar opciones aleatorias para cada ejercicio
  const generateExercise = useCallback(() => {
    const shapes = Object.values(ADVANCED_SHAPES);
    const distractors = Object.values(DISTRACTOR_SHAPES);
    const target = shapes[Math.floor(Math.random() * shapes.length)];
    
    // Generar rotación y escala aleatoria para el objetivo
    const rotations = SOMBRAS_CAMBIANTES_CONFIG.ROTATIONS;
    const scales = SOMBRAS_CAMBIANTES_CONFIG.SCALE_VARIANTS;
    const rotation = rotations[Math.floor(Math.random() * rotations.length)];
    const scale = scales[Math.floor(Math.random() * scales.length)];
    
    // Crear opciones: incluir la forma objetivo + 2-3 distractores
    const geometricDistractors = shapes.filter(shape => shape !== target);
    const nonGeometricDistractors = distractors;
    
    const allDistractors = [...geometricDistractors, ...nonGeometricDistractors];
    const shuffledDistractors = allDistractors.sort(() => 0.5 - Math.random());
    
    // Crear linternas con formas
    const linternas = [
      {
        id: 0,
        shape: target,
        rotation: Math.random() > 0.5 ? rotation : 0, // A veces con rotación, a veces sin ella
        scale: Math.random() > 0.5 ? scale : 1,
        isCorrect: true
      }
    ];
    
    // Agregar distractores
    for (let i = 1; i < SOMBRAS_CAMBIANTES_CONFIG.LINTERNAS_PER_EXERCISE; i++) {
      const distractorShape = shuffledDistractors[i - 1];
      linternas.push({
        id: i,
        shape: distractorShape,
        rotation: rotations[Math.floor(Math.random() * rotations.length)],
        scale: scales[Math.floor(Math.random() * scales.length)],
        isCorrect: false
      });
    }
    
    // Mezclar las linternas
    const shuffledLinternas = linternas.sort(() => 0.5 - Math.random());
    
    setTargetShape(target);
    setTargetRotation(rotation);
    setTargetScale(scale);
    setLinteranaOptions(shuffledLinternas);
    setRevealedShapes({});
    setSelectedLinterna(null);
    setAttempts(0);
    setIsCorrect(null);
    setShowShadow(true);
  }, []);

  // Inicializar el primer ejercicio
  useEffect(() => {
    generateExercise();
  }, [generateExercise]);

  // Manejar iluminación de linterna
  const handleLinternaPress = useCallback((linterna) => {
    if (revealedShapes[linterna.id]) return; // Ya revelada
    
    const newRevealed = { ...revealedShapes, [linterna.id]: true };
    setRevealedShapes(newRevealed);
    setSelectedLinterna(linterna);
    
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (linterna.isCorrect) {
      // Respuesta correcta
      setIsCorrect(true);
      setScore(prev => prev + SOMBRAS_CAMBIANTES_CONFIG.POINTS_PER_CORRECT);
      setCorrectAnswers(prev => prev + 1);
      setShowShadow(false); // Ocultar sombra al acertar
      
      // Avanzar al siguiente ejercicio después de un delay
      setTimeout(() => {
        if (currentExercise + 1 >= SOMBRAS_CAMBIANTES_CONFIG.TOTAL_EXERCISES) {
          setGameCompleted(true);
        } else {
          setCurrentExercise(prev => prev + 1);
          generateExercise();
        }
      }, 2000);
    } else {
      // Respuesta incorrecta
      setIsCorrect(false);
      
      if (newAttempts >= SOMBRAS_CAMBIANTES_CONFIG.MAX_ATTEMPTS) {
        // Revelar la respuesta correcta
        const correctLinterna = linternaOptions.find(l => l.isCorrect);
        const finalRevealed = { ...newRevealed, [correctLinterna.id]: true };
        setRevealedShapes(finalRevealed);
        setSelectedLinterna(correctLinterna);
        
        setTimeout(() => {
          if (currentExercise + 1 >= SOMBRAS_CAMBIANTES_CONFIG.TOTAL_EXERCISES) {
            setGameCompleted(true);
          } else {
            setCurrentExercise(prev => prev + 1);
            generateExercise();
          }
        }, 2500);
      } else {
        // Dar una pista visual: hacer parpadear sutilmente la linterna correcta
        setTimeout(() => {
          setSelectedLinterna(null);
          setIsCorrect(null);
        }, 1500);
      }
    }
  }, [revealedShapes, attempts, currentExercise, linternaOptions, generateExercise]);

  const calculateStars = useCallback(() => {
    const percentage = (correctAnswers / SOMBRAS_CAMBIANTES_CONFIG.TOTAL_EXERCISES) * 100;
    const thresholds = SOMBRAS_CAMBIANTES_CONFIG.STARS_THRESHOLD;
    
    if (percentage >= thresholds.THREE) return 3;
    if (percentage >= thresholds.TWO) return 2;
    if (percentage >= thresholds.ONE) return 1;
    return 0;
  }, [correctAnswers]);

  // Reiniciar juego
  const resetGame = useCallback(() => {
    setCurrentExercise(0);
    setScore(0);
    setCorrectAnswers(0);
    setGameCompleted(false);
    generateExercise();
  }, [generateExercise]);

  // Obtener mensaje de retroalimentación
  const getFeedbackMessage = useCallback((selectedLinterna) => {
    if (!targetShape || !selectedLinterna) return "";
    
    if (selectedLinterna.isCorrect) {
      return `¡Exacto! ¡Esa es la sombra de un ${SHAPE_NAMES[targetShape]}!`;
    } else {
      if (attempts === 1) {
        return `Esa no parece encajar con la sombra. ¡Prueba con otra linterna!`;
      } else {
        return `¡Casi! La forma correcta era el ${SHAPE_NAMES[targetShape]}. ¡Observa bien la sombra!`;
      }
    }
  }, [targetShape, attempts]);

  return {
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
    progress: ((currentExercise + 1) / SOMBRAS_CAMBIANTES_CONFIG.TOTAL_EXERCISES) * 100,
    exerciseNumber: currentExercise + 1,
    totalExercises: SOMBRAS_CAMBIANTES_CONFIG.TOTAL_EXERCISES,
  };
};