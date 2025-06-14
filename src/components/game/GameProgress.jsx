import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/colors';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 380;

const GameProgress = ({ currentExercise, totalExercises, score, progress }) => {
  return (
    <View style={[styles.container, isSmallScreen && styles.containerSmall]}>
      <View style={styles.progressSection}>
        <Text style={[styles.progressText, isSmallScreen && styles.progressTextSmall]}>
          {currentExercise} / {totalExercises}
        </Text>
        <View style={[styles.progressBarContainer, isSmallScreen && styles.progressBarContainerSmall]}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${progress}%` },
              isSmallScreen && styles.progressBarSmall
            ]}
          />
        </View>
      </View>
      
      <View style={[styles.scoreSection, isSmallScreen && styles.scoreSectionSmall]}>
        <Ionicons 
          name="star" 
          size={isSmallScreen ? 18 : 20} 
          color={Colors.primary.yellow} 
        />
        <Text style={[styles.scoreText, isSmallScreen && styles.scoreTextSmall]}>
          {score}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.overlay.light,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  containerSmall: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 8,
  },
  progressSection: {
    flex: 1,
    marginRight: 20,
  },
  progressText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressTextSmall: {
    fontSize: 12,
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.overlay.medium,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarContainerSmall: {
    height: 6,
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary.mint,
    borderRadius: 4,
  },
  progressBarSmall: {
    borderRadius: 3,
  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.overlay.medium,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  scoreSectionSmall: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  scoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  scoreTextSmall: {
    fontSize: 14,
    marginLeft: 4,
  },
});

export default GameProgress;