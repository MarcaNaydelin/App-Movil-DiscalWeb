import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../../styles/colors';

const MascotBubble = ({ message, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.bubbleWrapper}>
        <View style={styles.bubble}>
          <Text style={styles.message}>{message}</Text>
        </View>
        {/* Triángulo para el globo de diálogo */}
        <View style={styles.bubblePointer} />
      </View>
      <Image
        source={require('../../../assets/img/mascota/mascota2.png')}
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
    marginVertical: 10,
  },
  bubbleWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxWidth: '80%',
  },
  bubble: {
    backgroundColor: Colors.messageCloud.background,
    padding: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.messageCloud.border,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  message: {
    color: Colors.messageCloud.text,
    fontSize: 16,
    fontWeight: '500',
  },
  bubblePointer: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    width: 15,
    height: 15,
    backgroundColor: Colors.messageCloud.background,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.messageCloud.border,
    transform: [{ rotate: '45deg' }],
  },
  mascot: {
    width: 80,
    height: 80,
    marginRight: 5,
  },
});

export default MascotBubble;