import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppColors } from '../../styles/colors';

const ProfileAvatar = ({ name, image, size = 40, onPress }) => {
  // Get initials from name
  const getInitials = () => {
    if (!name) return '?';
    
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {image ? (
        <Image 
          source={{ uri: image }} 
          style={[
            styles.avatar, 
            { width: size, height: size, borderRadius: size / 2 }
          ]} 
        />
      ) : (
        <View 
          style={[
            styles.initialsContainer, 
            { width: size, height: size, borderRadius: size / 2 }
          ]}
        >
          <Text style={[styles.initialsText, { fontSize: size * 0.4 }]}>
            {getInitials()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  avatar: {
    borderWidth: 2,
    borderColor: AppColors.accentYellow,
  },
  initialsContainer: {
    backgroundColor: AppColors.accentYellow,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  initialsText: {
    color: AppColors.primaryPurple,
    fontWeight: 'bold',
  },
});

export default ProfileAvatar;