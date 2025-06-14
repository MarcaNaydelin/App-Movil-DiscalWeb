import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/colors';
import { SHAPE_IMAGES } from '../../utils/gameConstants';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 380;

const FlashlightSelector = ({
  linternas,
  revealedShapes,
  onLinternaPress,
  selectedLinterna,
  disabled = false,
  showFeedback = false
}) => {
  
  const getFlashlightStyle = (linterna) => {
    const baseStyle = [styles.flashlight];
    
    if (isSmallScreen) {
      baseStyle.push(styles.flashlightSmall);
    }
    
    if (revealedShapes[linterna.id]) {
      baseStyle.push(styles.flashlightRevealed);
      
      if (showFeedback && selectedLinterna?.id === linterna.id) {
        if (linterna.isCorrect) {
          baseStyle.push(styles.flashlightCorrect);
        } else {
          baseStyle.push(styles.flashlightIncorrect);
        }
      }
    } else {
      // Estilo para linternas no reveladas
      baseStyle.push(styles.flashlightUnrevealed);
    }
    
    return baseStyle;
  };

  const getShapeContainerStyle = (linterna) => {
    const transform = [
      { rotate: `${linterna.rotation || 0}deg` },
      { scale: linterna.scale || 1 }
    ];
    
    return {
      ...styles.shapeContainer,
      ...(isSmallScreen && styles.shapeContainerSmall),
      transform,
    };
  };

  const shouldShowShape = (linterna) => {
    return revealedShapes[linterna.id];
  };

  return (
    <View style={[styles.container, isSmallScreen && styles.containerSmall]}>
      <Text style={[styles.instructionText, isSmallScreen && styles.instructionTextSmall]}>
        Toca las linternas para iluminar las formas:
      </Text>
      
      <View style={styles.flashlightGrid}>
        {linternas.map((linterna) => (
          <TouchableOpacity
            key={linterna.id}
            style={styles.flashlightWrapper}
            onPress={() => !disabled && onLinternaPress(linterna)}
            disabled={disabled || revealedShapes[linterna.id]}
            activeOpacity={0.7}
          >
            <View style={getFlashlightStyle(linterna)}>
              {/* Flashlight icon when not revealed */}
              {!shouldShowShape(linterna) && (
                <View style={styles.flashlightIcon}>
                  <Ionicons
                    name="flashlight"
                    size={isSmallScreen ? 24 : 28}
                    color={Colors.primary.yellow}
                  />
                  <View style={styles.lightBeam} />
                  
                  {/* Texto indicativo */}
                  <Text style={styles.flashlightNumber}>
                    {linterna.id + 1}
                  </Text>
                </View>
              )}
              
              {/* Revealed shape with better visibility */}
              {shouldShowShape(linterna) && (
                <View style={styles.revealedArea}>
                  {/* Fondo iluminado */}
                  <View style={styles.illuminatedBackground} />
                  
                  <View style={getShapeContainerStyle(linterna)}>
                    <Image
                      source={SHAPE_IMAGES[linterna.shape]}
                      style={[
                        styles.shapeImage,
                        isSmallScreen && styles.shapeImageSmall
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Efecto de brillo */}
                  <View style={styles.shineEffect} />
                </View>
              )}
              
              {/* Glow effect for revealed shapes */}
              {shouldShowShape(linterna) && (
                <View style={styles.glowEffect} />
              )}
            </View>
            
            {/* Pulse effect for hints */}
            {showFeedback && !revealedShapes[linterna.id] && linterna.isCorrect && (
              <View style={styles.hintPulse} />
            )}
            
            {/* Status indicator */}
            {shouldShowShape(linterna) && (
              <View style={[
                styles.statusIndicator,
                linterna.isCorrect ? styles.correctIndicator : styles.incorrectIndicator
              ]}>
                <Ionicons
                  name={linterna.isCorrect ? "checkmark-circle" : "close-circle"}
                  size={16}
                  color="white"
                />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  containerSmall: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  instructionText: {
    color: Colors.text.light,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  instructionTextSmall: {
    fontSize: 14,
    marginBottom: 15,
  },
  flashlightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flashlightWrapper: {
    marginHorizontal: 8,
    marginVertical: 10,
    position: 'relative',
  },
  flashlight: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  flashlightSmall: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 2,
  },
  flashlightUnrevealed: {
    backgroundColor: Colors.mundo1.cave,
    borderColor: Colors.primary.yellow,
  },
  flashlightRevealed: {
    backgroundColor: Colors.accentYellow,
    borderColor: Colors.primary.yellow,
  },
  flashlightCorrect: {
    backgroundColor: Colors.feedback.correct,
    borderColor: Colors.feedback.correct,
    shadowColor: Colors.feedback.correct,
    shadowOpacity: 0.6,
  },
  flashlightIncorrect: {
    backgroundColor: Colors.feedback.incorrect,
    borderColor: Colors.feedback.incorrect,
    shadowColor: Colors.feedback.incorrect,
    shadowOpacity: 0.6,
  },
  flashlightIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  lightBeam: {
    position: 'absolute',
    top: -15,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: Colors.primary.yellow,
    opacity: 0.4,
  },
  flashlightNumber: {
    position: 'absolute',
    bottom: -25,
    color: Colors.primary.yellow,
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  revealedArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  illuminatedBackground: {
    position: 'absolute',
    width: '90%',
    height: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 40,
  },
  shapeContainer: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  shapeContainerSmall: {
    width: 45,
    height: 45,
  },
  shapeImage: {
    width: 50,
    height: 50,
    tintColor: Colors.mundo1.cave, // Color marrón oscuro para mejor contraste
  },
  shapeImageSmall: {
    width: 40,
    height: 40,
  },
  shineEffect: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '30%',
    height: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    transform: [{ rotate: '45deg' }],
  },
  glowEffect: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 239, 161, 0.3)',
    shadowColor: Colors.primary.yellow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  hintPulse: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary.yellow,
    opacity: 0.8,
  },
  statusIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  correctIndicator: {
    backgroundColor: Colors.feedback.correct,
  },
  incorrectIndicator: {
    backgroundColor: Colors.feedback.incorrect,
  },
});

export default FlashlightSelector;