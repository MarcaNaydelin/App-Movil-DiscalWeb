import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppColors } from '../styles/colors';

// Esta es una pantalla de marcador de posición que puedes completar después
const GameMenuScreen = () => {
  return (
    <LinearGradient 
      colors={[AppColors.primaryBlue, AppColors.primaryPurple]} 
      style={styles.container}
    >
      <Text style={styles.headerText}>¡Menú de Juegos!</Text>
      <Text style={styles.subText}>Esta pantalla está en construcción</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  }
});

export default GameMenuScreen;