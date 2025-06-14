import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../styles/colors';
import { SHAPE_IMAGES } from '../../utils/gameConstants';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 380;

const ShapeSelector = ({ 
  shapes, onSelect, selectedShape, correctShape, showFeedback, disabled = false 
}) => {
  
  const getShapeStyle = (shape) => {
    if (!showFeedback) return styles.rockNormal;
    
    if (shape === correctShape) {
      return [styles.rockNormal, styles.rockCorrect];
    } else if (shape === selectedShape && shape !== correctShape) {
      return [styles.rockNormal, styles.rockIncorrect];
    }
    
    return styles.rockNormal;
  };

  const getRockContainerStyle = (shape) => {
    const baseStyle = [styles.rockContainer];
    
    if (showFeedback && shape === correctShape) {
      baseStyle.push(styles.rockContainerCorrect);
    } else if (showFeedback && shape === selectedShape && shape !== correctShape) {
      baseStyle.push(styles.rockContainerIncorrect);
    }
    
    return baseStyle;
  };

  return (
    <View style={[styles.container, isSmallScreen && styles.containerSmall]}>
      {shapes.map((shape, index) => (
        <TouchableOpacity
          key={`${shape}-${index}`}
          style={getRockContainerStyle(shape)}
          onPress={() => !disabled && onSelect(shape)}
          disabled={disabled}
          activeOpacity={0.8}
        >
          <View style={[
            getShapeStyle(shape),
            isSmallScreen && styles.rockNormalSmall
          ]}>
            <Image
              source={SHAPE_IMAGES[shape]}
              style={[
                styles.shapeImage,
                isSmallScreen && styles.shapeImageSmall
              ]}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexWrap: 'wrap',
  },
  containerSmall: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  rockContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  rockContainerCorrect: {
    transform: [{ scale: 1.1 }],
  },
  rockContainerIncorrect: {
    transform: [{ scale: 0.95 }],
  },
  rockNormal: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.mundo1.rock,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 3,
    borderColor: Colors.mundo1.cave,
  },
  rockNormalSmall: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
  },
  rockCorrect: {
    backgroundColor: Colors.feedback.correct,
    borderColor: Colors.feedback.correct,
    shadowColor: Colors.feedback.correct,
    shadowOpacity: 0.5,
  },
  rockIncorrect: {
    backgroundColor: Colors.feedback.incorrect,
    borderColor: Colors.feedback.incorrect,
    shadowColor: Colors.feedback.incorrect,
    shadowOpacity: 0.5,
  },
  shapeImage: {
    width: 50,
    height: 50,
    tintColor: '#FFFFFF',
  },
  shapeImageSmall: {
    width: 42,
    height: 42,
  },
});

export default ShapeSelector;