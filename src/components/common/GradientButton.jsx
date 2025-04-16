import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Animated, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppColors } from '../../styles/colors';

const GradientButton = ({
  text,
  onPress,
  colors = [AppColors.accentPink, AppColors.primaryPurple],
  width = '100%',
  height = 70,
  fontSize = 26,
  style,
  textStyle,
  disabled = false,
}) => {
  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.buttonWrapper,
        { width, height, borderRadius: height / 2 },
        disabled && styles.disabled,
        style
      ]}
      onPress={handlePress}
      activeOpacity={disabled ? 1 : 0.8}
    >
      <LinearGradient
        colors={disabled ? ['#AAAAAA', '#999999'] : colors}
        style={[styles.gradient, { borderRadius: height / 2 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[styles.text, { fontSize }, disabled && styles.disabledText, textStyle]}>
          {text}
        </Text>
        
        {/* Efecto de brillo en la parte superior */}
        <View style={styles.glow} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  disabled: {
    opacity: 0.7,
  },
  disabledText: {
    color: '#EEEEEE',
  },
});

export default GradientButton;