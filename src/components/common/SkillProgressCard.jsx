import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { Colors } from '../../styles/colors';

const SkillProgressCard = ({ title, progress = 0, icon }) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Progress animation with smooth easing
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress]);
  
  const renderIcon = () => {
    switch (icon) {
      case 'add':
        return '+';
      case 'remove':
        return '−';
      case 'multiply':
        return '×';
      case 'divide':
        return '÷';
      default:
        return '?';
    }
  };
  
  // Para el cálculo del progreso circular
  const SIZE = 110;
  const STROKE_WIDTH = 10;
  const radius = (SIZE - STROKE_WIDTH) / 2;
  const circumference = radius * 2 * Math.PI;
  
  // Calculamos el offset para que comience desde arriba (270°)
  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });
  
  // Color del progreso basado en el valor - usando la paleta de colores actualizada
  const progressColor = animatedProgress.interpolate({
    inputRange: [0, 33, 66, 100],
    outputRange: [
      Colors.states.info,          // Azul primario para inicio
      Colors.mint.primary,         // Verde menta para progreso medio
      Colors.mascot.happy,         // Amarillo para progreso alto
      Colors.accentPink || '#E67FA2'  // Rosa para completado
    ]
  });

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  
  return (
    <View style={styles.container}>
      <View style={styles.progressWrapper}>
        {/* SVG Circle Progress */}
        <Svg width={SIZE} height={SIZE} style={styles.svg}>
          {/* Fondo circular con un borde suave */}
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={SIZE / 2}
            fill="rgba(255, 255, 255, 0.18)"
          />
          
          {/* Background Circle */}
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={radius}
            stroke={Colors.states.info}
            strokeWidth={STROKE_WIDTH / 2}
            fill="transparent"
            opacity={0.2}
            strokeLinecap="round"
          />
          
          {/* Progress Circle */}
          <G rotation="90" origin={`${SIZE / 2}, ${SIZE / 2}`}>
            <AnimatedCircle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={radius}
              stroke={progressColor}
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </G>
        </Svg>
        
        {/* Inner circle */}
        <View style={styles.innerCircle}>
          <Text style={styles.icon}>{renderIcon()}</Text>
        </View>
        
        {/* Percentage tag */}
        <View style={styles.percentageContainer}>
          <Text style={styles.percentageText}>{`${Math.round(progress)}%`}</Text>
        </View>
      </View>
      
      {/* Título con fondo suave */}
      <View style={[styles.titleBackground, (title.length > 8) && styles.wideTitleBackground]}>
        <Text style={[styles.title, (title.length > 8) && styles.smallerTitle]}>{title}</Text>
      </View>
      
      {/* Badge for high progress */}
      {progress > 90 && (
        <View style={styles.achievementBadge}>
          <Text style={styles.achievementText}>¡Experto!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 12,
    width: 150, // Increased width from 140 to 150
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  progressWrapper: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 32,
  },
  svg: {
    position: 'absolute',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  innerCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: Colors.text.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  icon: {
    fontSize: 44,
    fontWeight: 'bold',
    color: Colors.text.light,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  percentageContainer: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: Colors.progressBar.fill,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 15,
    zIndex: 5,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: Colors.text.light,
    minWidth: 50,
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text.highlight,
  },
  titleBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
  },
  wideTitleBackground: {
    width: 140, // Fixed width for longer titles
    paddingHorizontal: 5, // Less padding for longer titles
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.light,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  smallerTitle: {
    fontSize: 16, 
  },
  achievementBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.progressBar.fill,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.text.light,
    transform: [{ rotate: '12deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  achievementText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text.highlight,
  },
});

export default SkillProgressCard;