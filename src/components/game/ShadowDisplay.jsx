import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/colors';
import { SHAPE_IMAGES, SHAPE_NAMES } from '../../utils/gameConstants';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 380;

const ShadowDisplay = ({ 
  targetShape, 
  targetRotation = 0, 
  targetScale = 1, 
  showShadow = true,
  showShapeName = true
}) => {
  if (!targetShape || !showShadow) return null;

  const shadowTransform = [
    { rotate: `${targetRotation}deg` },
    { scale: targetScale }
  ];

  return (
    <View style={[styles.container, isSmallScreen && styles.containerSmall]}>
      <View style={styles.caveBackground}>
        <View style={styles.shadowArea}>
          <Text style={[styles.instructionText, isSmallScreen && styles.instructionTextSmall]}>
            Encuentra la sombra del:
          </Text>
          
          {showShapeName && (
            <Text style={[styles.shapeNameText, isSmallScreen && styles.shapeNameTextSmall]}>
              {SHAPE_NAMES[targetShape]}
            </Text>
          )}
          
          {/* Área de la sombra mejorada */}
          <View style={[styles.shadowContainer, isSmallScreen && styles.shadowContainerSmall]}>
            {/* Fondo iluminado para crear contraste */}
            <View style={styles.shadowBackdrop} />
            
            {/* Sombra con mejor contraste */}
            <Image
              source={SHAPE_IMAGES[targetShape]}
              style={[
                styles.shadowImage,
                isSmallScreen && styles.shadowImageSmall,
                { transform: shadowTransform }
              ]}
              resizeMode="contain"
            />
            
            {/* Efecto de luz proyectada */}
            <View style={styles.lightProjection} />
          </View>
          
          {/* Indicador visual de que es una sombra */}
          <View style={styles.shadowIndicator}>
            <Ionicons 
              name="flashlight" 
              size={isSmallScreen ? 16 : 20} 
              color={Colors.primary.yellow} 
            />
            <Text style={styles.shadowLabel}>Sombra</Text>
          </View>
        </View>
        
        {/* Decoración de cueva mejorada */}
        <View style={styles.caveDecoration}>
          <Ionicons name="diamond" size={12} color={Colors.primary.mint} style={styles.crystal1} />
          <Ionicons name="diamond" size={8} color={Colors.primary.yellow} style={styles.crystal2} />
          <Ionicons name="diamond" size={10} color={Colors.accentPink} style={styles.crystal3} />
          
          {/* Efectos de luz en las paredes */}
          <View style={styles.wallLight1} />
          <View style={styles.wallLight2} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginTop: 20,
  },
  containerSmall: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 15,
  },
  caveBackground: {
    backgroundColor: Colors.mundo1.cave,
    borderRadius: 20,
    padding: 20,
    minHeight: 220,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 2,
    borderColor: Colors.primary.yellow,
  },
  shadowArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 69, 19, 0.8)', // Color tierra más claro
    borderRadius: 15,
    padding: 15,
    borderWidth: 2,
    borderColor: Colors.primary.yellow,
    borderStyle: 'dashed',
  },
  instructionText: {
    color: Colors.primary.yellow,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  instructionTextSmall: {
    fontSize: 14,
    marginBottom: 4,
  },
  shapeNameText: {
    color: Colors.accentYellow,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary.yellow,
    paddingBottom: 5,
  },
  shapeNameTextSmall: {
    fontSize: 18,
    marginBottom: 12,
  },
  shadowContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  shadowContainerSmall: {
    width: 100,
    height: 100,
  },
  // Fondo iluminado para crear contraste
  shadowBackdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.accentYellow,
    borderRadius: 10,
    opacity: 0.3,
  },
  shadowImage: {
    width: 90,
    height: 90,
    tintColor: '#2D1810', // Color marrón muy oscuro en lugar de negro puro
    opacity: 0.9,
    zIndex: 2,
  },
  shadowImageSmall: {
    width: 75,
    height: 75,
  },
  // Efecto de luz proyectada
  lightProjection: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 239, 161, 0.2)',
    shadowColor: Colors.primary.yellow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  shadowIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 239, 161, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary.yellow,
  },
  shadowLabel: {
    color: Colors.primary.yellow,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
    letterSpacing: 0.5,
  },
  caveDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  crystal1: {
    position: 'absolute',
    top: 15,
    right: 20,
    opacity: 0.7,
  },
  crystal2: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    opacity: 0.6,
  },
  crystal3: {
    position: 'absolute',
    top: 40,
    left: 25,
    opacity: 0.5,
  },
  // Nuevos efectos de luz en las paredes
  wallLight1: {
    position: 'absolute',
    top: 30,
    right: 40,
    width: 20,
    height: 30,
    backgroundColor: 'rgba(255, 239, 161, 0.1)',
    borderRadius: 10,
    transform: [{ rotate: '45deg' }],
  },
  wallLight2: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    width: 25,
    height: 20,
    backgroundColor: 'rgba(166, 241, 224, 0.1)',
    borderRadius: 10,
    transform: [{ rotate: '-30deg' }],
  },
});

export default ShadowDisplay;