import { useState, useEffect, useCallback } from 'react';
import { BASIC_SHAPES, SHAPE_NAMES, ROCAS_MISTERIOSAS_CONFIG } from '../utils/gameConstants';

export const useGameLogic = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [targetShape, setTargetShape] = useState(null);
  const [shapeOptions, setShapeOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Generar opciones aleatorias para cada ejercicio
  const generateExercise = useCallback(() => {
    const shapes = Object.values(BASIC_SHAPES);
    const target = shapes[Math.floor(Math.random() * shapes.length)];
    
    // Crear opciones: incluir la forma objetivo + 2-3 distractores
    const distractors = shapes.filter(shape => shape !== target);
    const shuffledDistractors = distractors.sort(() => 0.5 - Math.random());
    const options = [target, ...shuffledDistractors.slice(0, 2)];
    
    const shuffledOptions = options.sort(() => 0.5 - Math.random());
    
    setTargetShape(target);
    setShapeOptions(shuffledOptions);
    setAttempts(0);
    setIsCorrect(null);
  }, []);

  // Inicializar el primer ejercicio
  useEffect(() => {
    generateExercise();
  }, [generateExercise]);

  // Manejar selección de forma
  const handleShapeSelect = useCallback((selectedShape) => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (selectedShape === targetShape) {
      // Respuesta correcta
      setIsCorrect(true);
      setScore(prev => prev + ROCAS_MISTERIOSAS_CONFIG.POINTS_PER_CORRECT);
      setCorrectAnswers(prev => prev + 1);
      
      // Avanzar al siguiente ejercicio después de un delay
      setTimeout(() => {
        if (currentExercise + 1 >= ROCAS_MISTERIOSAS_CONFIG.TOTAL_EXERCISES) {
          setGameCompleted(true);
        } else {
          setCurrentExercise(prev => prev + 1);
          generateExercise();
        }
      }, 1500);
    } else {
      // Respuesta incorrecta
      setIsCorrect(false);
      
      if (newAttempts >= ROCAS_MISTERIOSAS_CONFIG.MAX_ATTEMPTS) {
        // Mostrar respuesta correcta y avanzar
        setTimeout(() => {
          if (currentExercise + 1 >= ROCAS_MISTERIOSAS_CONFIG.TOTAL_EXERCISES) {
            setGameCompleted(true);
          } else {
            setCurrentExercise(prev => prev + 1);
            generateExercise();
          }
        }, 2000);
      }
    }
  }, [targetShape, attempts, currentExercise, generateExercise]);

  const calculateStars = useCallback(() => {
    const percentage = (correctAnswers / ROCAS_MISTERIOSAS_CONFIG.TOTAL_EXERCISES) * 100;
    const thresholds = ROCAS_MISTERIOSAS_CONFIG.STARS_THRESHOLD;
    
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
  const getFeedbackMessage = useCallback((selectedShape) => {
    if (!targetShape) return "";
    
    if (selectedShape === targetShape) {
      return `¡Sí! ¡Ese es un ${SHAPE_NAMES[targetShape]}! ¡Genial!`;
    } else {
      if (attempts === 0) {
        return `Mmm, esa forma es un ${SHAPE_NAMES[selectedShape]}. Estamos buscando el ${SHAPE_NAMES[targetShape]}. ¡Mira bien la forma de arriba e inténtalo de nuevo!`;
      } else {
        return `¡Casi! El ${SHAPE_NAMES[targetShape]} es este...`;
      }
    }
  }, [targetShape, attempts]);

  return {
    // Estado del juego
    currentExercise,
    targetShape,
    shapeOptions,
    score,
    attempts,
    isCorrect,
    gameCompleted,
    correctAnswers,
    
    // Funciones
    handleShapeSelect,
    calculateStars,
    resetGame,
    getFeedbackMessage,
    
    // Utilidades
    progress: ((currentExercise + 1) / ROCAS_MISTERIOSAS_CONFIG.TOTAL_EXERCISES) * 100,
    exerciseNumber: currentExercise + 1,
    totalExercises: ROCAS_MISTERIOSAS_CONFIG.TOTAL_EXERCISES,
  };
};