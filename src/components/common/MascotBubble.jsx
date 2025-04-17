import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../../styles/colors';

const MascotBubble = ({ message, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.bubble}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <Image 
        source={require('../../../assets/img/mascota/mascota5.png')} 
        style={styles.mascot} 
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bubble: {
    backgroundColor: Colors.messageCloud.background,
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.messageCloud.border,
    marginRight: 10,
    maxWidth: '80%',
  },
  message: {
    color: Colors.messageCloud.text,
    fontSize: 14,
  },
  mascot: {
    width: 60,
    height: 60,
  },
});

export default MascotBubble;