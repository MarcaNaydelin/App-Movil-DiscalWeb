import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { AppColors } from '../../styles/colors';

const MessageCloud = ({
  message,
  style,
  textStyle,
  fadeAnim = new Animated.Value(1),
  slideAnim = new Animated.Value(0),
  borderColor = AppColors.accentYellow,
  onPress = null
}) => {
  return (
    <Animated.View
      style={[
        styles.cloud,
        { borderColor },
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        },
        style
      ]}
    >
      <Text style={[styles.text, textStyle]}>
        {message}
      </Text>
      
      {/* Decoración de burbujas dentro del mensaje */}
      <View style={[styles.bubble, styles.bubbleSmall, { top: 15, right: 25 }]} />
      <View style={[styles.bubble, styles.bubbleMedium, { bottom: 20, left: 20 }]} />
      <View style={[styles.bubble, styles.bubbleSmall, { bottom: 35, right: 40 }]} />
      
      {/* Triángulo que apunta hacia la mascota */}
      <View style={styles.pointer} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cloud: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 24,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: AppColors.accentYellow,
    position: 'relative',
    zIndex: 10
  },
  text: {
    fontSize: 26,
    color: AppColors.primaryPurple,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pointer: {
    position: 'absolute',
    bottom: -20,
    left: '50%',
    marginLeft: -20,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderTopWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(107, 85, 174, 0.1)', // AppColors.primaryPurple con opacidad
    borderRadius: 50,
    zIndex: -1,
  },
  bubbleSmall: {
    width: 20,
    height: 20,
  },
  bubbleMedium: {
    width: 30,
    height: 30,
  }
});

export default MessageCloud;