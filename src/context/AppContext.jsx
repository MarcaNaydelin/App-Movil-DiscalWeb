import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crear el contexto
const AppContext = createContext();

// Hook para usar el contexto
export const useAppContext = () => useContext(AppContext);

// Proveedor del contexto
export const AppContextProvider = ({ children }) => {
  const [mascotMood, setMascotMood] = useState('greeting');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState('');
  
  // Estado para los juegos de formas prehistóricas
  const [prehistoricGames, setPrehistoricGames] = useState({
    rocasMisteriosas: {
      unlocked: true,
      completed: false,
      stars: 0,
      bestScore: 0
    },
    sombrasCambiantes: {
      unlocked: false,
      completed: false,
      stars: 0,
      bestScore: 0
    }
  });

  // Cargar datos del almacenamiento local al iniciar
  useEffect(() => {
    loadGameProgress();
  }, []);

  const loadGameProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('prehistoricGames');
      if (savedProgress) {
        setPrehistoricGames(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.log('Error loading game progress:', error);
    }
  };

  const saveGameProgress = async (newProgress) => {
    try {
      await AsyncStorage.setItem('prehistoricGames', JSON.stringify(newProgress));
      setPrehistoricGames(newProgress);
    } catch (error) {
      console.log('Error saving game progress:', error);
    }
  };

  // Funciones para manipular el estado
  const changeMascotMood = (mood) => {
    setMascotMood(mood);
  };

  const incrementScore = (points) => {
    setScore(current => current + points);
  };

  const advanceLevel = () => {
    setCurrentLevel(current => current + 1);
  };

  const updateUserName = (name) => {
    setUserName(name);
  };

  // Completar un juego prehistórico
  const completePrehistoricGame = async (gameId, stars, score) => {
    const newProgress = { ...prehistoricGames };
    newProgress[gameId].completed = true;
    newProgress[gameId].stars = Math.max(newProgress[gameId].stars, stars);
    newProgress[gameId].bestScore = Math.max(newProgress[gameId].bestScore, score);
    
    // Desbloquear el siguiente juego si es necesario
    if (gameId === 'rocasMisteriosas' && stars >= 1) {
      newProgress.sombrasCambiantes.unlocked = true;
    }
    
    await saveGameProgress(newProgress);
  };

  const value = {
    mascotMood,
    currentLevel,
    score,
    userName,
    prehistoricGames,
    changeMascotMood,
    incrementScore,
    advanceLevel,
    updateUserName,
    completePrehistoricGame,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};