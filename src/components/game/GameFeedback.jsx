import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/colors';
import MascotBubble from '../common/MascotBubble';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 380;

const GameFeedback = ({ isCorrect, message, showFeedback, targetShape }) => {
  if (!showFeedback) return null;

  const getMascotType = () => {
    if (isCorrect === true) return 'celebration';
    if (isCorrect === false) return 'thinking';
    return 'default';
  };

  const getTheme = () => {
    if (isCorrect === true) return 'success';
    if (isCorrect === false) return 'warning';
    return 'default';
  };

  const getIconName = () => {
    if (isCorrect === true) return 'checkmark-circle';
    if (isCorrect === false) return 'help-circle';
    return 'information-circle';
  };

  const getIconColor = () => {
    if (isCorrect === true) return Colors.feedback.correct;
    if (isCorrect === false) return Colors.feedback.hint;
    return Colors.feedback.neutral;
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={getIconName()}
          size={isSmallScreen ? 28 : 32}
          color={getIconColor()}
        />
      </View>
      
      <MascotBubble
        message={message}
        mascotType={getMascotType()}
        theme={getTheme()}
        bubblePosition="right"
        style={styles.mascotBubble}
        mascotSize={isSmallScreen ? { width: 60, height: 60 } : { width: 80, height: 80 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    minHeight: isSmallScreen ? 100 : 120,
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 30,
    zIndex: 1,
    backgroundColor: Colors.overlay.light,
    borderRadius: 20,
    padding: 8,
  },
  mascotBubble: {
    marginTop: 10,
  },
});

export default GameFeedback;