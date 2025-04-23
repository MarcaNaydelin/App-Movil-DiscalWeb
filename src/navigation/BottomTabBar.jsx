import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../styles/colors';

const BottomTabBar = ({ currentTab, onTabPress, style }) => {
  const navigation = useNavigation();
  
  const tabs = [
    { id: 'home', name: 'Inicio', icon: 'home' },
    { id: 'games', name: 'Juegos', icon: 'game-controller' },
    { id: 'achievements', name: 'Logros', icon: 'trophy' },
    { id: 'profile', name: 'Perfil', icon: 'person' },
  ];
  
  const handleTabPress = (tabId) => {
    if (tabId === currentTab) return;
    
    if (tabId === 'home') {
      navigation.navigate('Home');
    } else if (tabId === 'games') {
      navigation.navigate('GameMenu');
    } else {
      // Por implementar otras pantallas
      onTabPress(tabId);
    }
  };
  
  return (
    <View style={[styles.container, style]}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => handleTabPress(tab.id)}
          style={[styles.tab, currentTab === tab.id && styles.activeTab]}
        >
          <Ionicons 
            name={tab.icon} 
            size={22} 
            color={currentTab === tab.id ? Colors.text.highlight : Colors.text.secondary} 
          />
          <Text 
            style={[
              styles.tabLabel, 
              currentTab === tab.id && styles.activeTabLabel
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    height: 60,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(107, 85, 174, 0.05)',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
    color: Colors.text.secondary,
  },
  activeTabLabel: {
    color: Colors.text.highlight,
    fontWeight: '500',
  },
});

export default BottomTabBar;