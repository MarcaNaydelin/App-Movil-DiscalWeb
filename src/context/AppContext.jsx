import React, { createContext, useContext, useState } from 'react';

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
  
  const value = {
    mascotMood,
    currentLevel,
    score,
    userName,
    changeMascotMood,
    incrementScore,
    advanceLevel,
    updateUserName,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};