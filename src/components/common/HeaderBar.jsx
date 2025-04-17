import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppColors, Colors } from '../../styles/colors';

const HeaderBar = ({ title, onBack, coins, stars, rightComponent }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightSection}>
        <View style={styles.statsContainer}>
          {coins !== undefined && (
            <View style={styles.statItem}>
              <Ionicons name="cash-outline" size={18} color={Colors.button.secondary.background} />
              <Text style={styles.statText}>{coins}</Text>
            </View>
          )}
          
          {stars !== undefined && (
            <View style={styles.statItem}>
              <Ionicons name="star" size={18} color={Colors.button.secondary.background} />
              <Text style={styles.statText}>{stars}</Text>
            </View>
          )}
        </View>
        
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 40,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft: 8,
  },
  statText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default HeaderBar;