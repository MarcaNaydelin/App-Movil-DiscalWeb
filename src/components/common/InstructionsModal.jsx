import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/colors';
import MascotBubble from './MascotBubble';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 380;

const InstructionsModal = ({ 
  visible, 
  onClose, 
  title, 
  instructions = [],
  gameType = 'default',
  mascotType = 'greeting'
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      setCurrentStep(0);
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      animatedValue.setValue(0);
    }
  }, [visible]);

  const handleNext = () => {
    if (currentStep < instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const getCurrentInstruction = () => {
    return instructions[currentStep] || {
      title: title,
      message: "¡Preparate para jugar!",
      icon: "play-circle"
    };
  };

  const getThemeColors = () => {
    switch (gameType) {
      case 'rocasMisteriosas':
        return {
          primary: Colors.mundo1.primary,
          secondary: Colors.mundo1.secondary,
          accent: Colors.mundo1.accent,
        };
      default:
        return {
          primary: Colors.primary.blue,
          secondary: Colors.primary.mint,
          accent: Colors.primary.purple,
        };
    }
  };

  const currentInstruction = getCurrentInstruction();
  const themeColors = getThemeColors();
  const isLastStep = currentStep === instructions.length - 1;

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
              opacity: animatedValue,
            },
          ]}
        >
          <LinearGradient
            colors={[themeColors.primary, themeColors.secondary]}
            style={styles.gradient}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={currentInstruction.icon || "information-circle"}
                  size={30}
                  color="white"
                />
              </View>
              <Text style={[styles.title, isSmallScreen && styles.titleSmall]}>
                {currentInstruction.title || title}
              </Text>
            </View>

            {/* Progress Indicator */}
            {instructions.length > 1 && (
              <View style={styles.progressContainer}>
                {instructions.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.progressDot,
                      index === currentStep && styles.progressDotActive,
                    ]}
                  />
                ))}
              </View>
            )}

            {/* Content */}
            <View style={styles.content}>
              <MascotBubble
                mascotType={mascotType}
                theme="light"
                message={currentInstruction.message}
                bubblePosition="center"
                mascotSize={isSmallScreen ? { width: 70, height: 70 } : { width: 90, height: 90 }}
              />
            </View>

            {/* Example or Visual Aid (if provided) */}
            {currentInstruction.example && (
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleText}>{currentInstruction.example}</Text>
              </View>
            )}

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              {instructions.length > 1 && currentStep > 0 && (
                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary]}
                  onPress={() => setCurrentStep(currentStep - 1)}
                >
                  <Ionicons name="arrow-back" size={16} color={themeColors.accent} />
                  <Text style={[styles.buttonSecondaryText, { color: themeColors.accent }]}>
                    Anterior
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonPrimary,
                  { backgroundColor: themeColors.accent },
                  (instructions.length <= 1 || currentStep === 0) && styles.buttonFull
                ]}
                onPress={handleNext}
              >
                <Text style={styles.buttonPrimaryText}>
                  {isLastStep ? '¡Comenzar!' : instructions.length > 1 ? 'Siguiente' : '¡Entendido!'}
                </Text>
                <Ionicons
                  name={isLastStep ? "play" : "arrow-forward"}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  gradient: {
    padding: 25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  titleSmall: {
    fontSize: 18,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: 'white',
    width: 20,
  },
  content: {
    marginBottom: 25,
    minHeight: height * 0.15,
    justifyContent: 'center',
  },
  exampleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  exampleText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    minHeight: 50,
  },
  buttonFull: {
    flex: 1,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary.purple,
    flex: 1,
    marginLeft: 10,
  },
  buttonSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'white',
    flex: 1,
    marginRight: 10,
  },
  buttonPrimaryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  buttonSecondaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default InstructionsModal;