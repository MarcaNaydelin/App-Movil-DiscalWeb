import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import GameMenuScreen from '../screens/GameMenuScreen';
import HomeScreen from '../screens/HomeScreen'; 
import AchievementsScreen from '../screens/AchievementsScreen';

// Crea el stack de navegación
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen 
          name="GameMenu" 
          component={GameMenuScreen}
          options={{ gestureEnabled: false }} 
        />
        <Stack.Screen
          name="Achievements"
          component={AchievementsScreen}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;