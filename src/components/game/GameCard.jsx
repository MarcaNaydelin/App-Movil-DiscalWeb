import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../styles/colors';

const GameCard = ({ 
  title, 
  description, 
  level, 
  stars, 
  color, 
  icon, 
  levelColors, 
  locked = false,
  onPress 
}) => {
  const maxStars = 3;
  
  const defaultLevelColors = {
    1: Colors.states.success, // Verde para fácil
    2: Colors.states.warning, // Naranja para medio
    3: Colors.states.error, // Rojo para difícil
  };
  
  const finalLevelColors = levelColors || defaultLevelColors;

  const cardOpacity = locked ? 0.6 : 1;
  const cardColor = locked ? '#CCCCCC' : color;

  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={locked ? 1 : 0.8}
      disabled={locked}
    >
      <View style={[styles.card, { opacity: cardOpacity }]}>
        <LinearGradient
          colors={[cardColor, cardColor + '80']} 
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.iconContainer}>
            {locked ? (
              <Ionicons name="lock-closed" size={32} color="white" />
            ) : (
              <Text style={styles.gameIcon}>{icon || '🎮'}</Text>
            )}
          </View>
        </LinearGradient>
        
        <View style={styles.content}>
          <Text style={[styles.title, locked && styles.lockedText]}>{title}</Text>
          <Text style={[styles.description, locked && styles.lockedText]}>
            {locked ? 'Completa el juego anterior' : description}
          </Text>
          
          <View style={styles.footer}>
            <View style={[
              styles.levelIndicator, 
              { backgroundColor: finalLevelColors[level] || '#BBBBBB' }
            ]}>
              <Text style={styles.levelText}>Nivel {level}</Text>
            </View>
            
            <View style={styles.starsContainer}>
              {[...Array(maxStars)].map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < stars ? "star" : "star-outline"}
                  size={20}
                  color={i < stars ? "#FFD700" : "#BBBBBB"}
                  style={styles.star}
                />
              ))}
            </View>
          </View>
        </View>
        
        <View style={[styles.playButton, { backgroundColor: cardColor }]}>
          <Ionicons 
            name={locked ? "lock-closed" : "play"} 
            size={28} 
            color="white" 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    marginBottom: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  gradient: {
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  gameIcon: {
    fontSize: 32,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  lockedText: {
    color: '#AAAAAA',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  levelIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    marginLeft: 3,
  },
  playButton: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameCard;