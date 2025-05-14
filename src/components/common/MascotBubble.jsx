import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../../styles/colors';

// Objeto con todas las variantes de mascotas disponibles
const MASCOTS = {
  default: require('../../../assets/img/mascota/mascota1.png'),
  happy: require('../../../assets/img/mascota/mascota6.png'),
  thinking: require('../../../assets/img/mascota/mascota2.png'),
  surprised: require('../../../assets/img/mascota/mascota4.png'),
  celebration: require('../../../assets/img/mascota/mascota3.png'),
};

// Temas para el globo de diálogo
const BUBBLE_THEMES = {
  default: {
    background: Colors.messageCloud.background,
    border: Colors.messageCloud.border,
    text: Colors.messageCloud.text,
  },
  success: {
    background: Colors.mint.light,
    border: Colors.mint.primary,
    text: Colors.mint.dark,
  },
  warning: {
    background: '#FFF3CD',
    border: '#FFE69C',
    text: '#856404',
  },
  error: {
    background: '#F8D7DA',
    border: '#F5C6CB',
    text: '#721C24',
  },
};

const MascotBubble = ({ 
  message, 
  style, 
  mascotType = 'default', 
  theme = 'default',
  customMascot = null,
  mascotSize = { width: 80, height: 80 },
  bubblePosition = 'right' // 'right' o 'left'
}) => {
  // Determinar qué imagen de mascota usar
  const mascotImage = customMascot || MASCOTS[mascotType] || MASCOTS.default;
  
  // Obtener el tema del globo
  const bubbleTheme = BUBBLE_THEMES[theme] || BUBBLE_THEMES.default;

  return (
    <View style={[
      styles.container, 
      style,
      bubblePosition === 'left' && styles.containerReversed
    ]}>
      {bubblePosition === 'right' && (
        <View style={styles.bubbleWrapper}>
          <View style={[
            styles.bubble, 
            { 
              backgroundColor: bubbleTheme.background,
              borderColor: bubbleTheme.border 
            }
          ]}>
            <Text style={[styles.message, { color: bubbleTheme.text }]}>
              {message}
            </Text>
          </View>
          <View style={[
            styles.bubblePointer,
            { 
              backgroundColor: bubbleTheme.background,
              borderColor: bubbleTheme.border 
            }
          ]} />
        </View>
      )}

      <Image
        source={mascotImage}
        style={[styles.mascot, mascotSize]}
        resizeMode="contain"
      />

      {bubblePosition === 'left' && (
        <View style={styles.bubbleWrapperLeft}>
          <View style={[
            styles.bubble, 
            { 
              backgroundColor: bubbleTheme.background,
              borderColor: bubbleTheme.border 
            }
          ]}>
            <Text style={[styles.message, { color: bubbleTheme.text }]}>
              {message}
            </Text>
          </View>
          <View style={[
            styles.bubblePointerLeft,
            { 
              backgroundColor: bubbleTheme.background,
              borderColor: bubbleTheme.border 
            }
          ]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  containerReversed: {
    flexDirection: 'row-reverse',
  },
  bubbleWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxWidth: '80%',
  },
  bubbleWrapperLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '80%',
  },
  bubble: {
    padding: 15,
    borderRadius: 20,
    borderWidth: 2,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
  },
  bubblePointer: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    width: 15,
    height: 15,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
  },
  bubblePointerLeft: {
    position: 'absolute',
    bottom: 10,
    left: 5,
    width: 15,
    height: 15,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '315deg' }],
  },
  mascot: {
    marginRight: 5,
  },
});

export default MascotBubble;