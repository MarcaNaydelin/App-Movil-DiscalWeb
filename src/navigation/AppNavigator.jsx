import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import GameMenuScreen from '../screens/GameMenuScreen';
import HomeScreen from '../screens/HomeScreen';
import AchievementsScreen from '../screens/AchievementsScreen';

import PrehistoricFormsScreen from '../screens/games/mundo1/PrehistoricFormsScreen';
import RocasMisteriosasScreen from '../screens/games/mundo1/RocasMisteriosasScreen';
import SombrasCambiantesScreen from '../screens/games/mundo1/SombrasCambiantesScreen';
import CrystalCaveScreen from '../screens/games/mundo2/CrystalCaveScreen';
import GoldenFruitsScreen from '../screens/games/mundo3/GoldenFruitsScreen';
import BrightComparisonsScreen from '../screens/games/mundo4/BrightComparisonsScreen';
import InitialSumsScreen from '../screens/games/mundo5/InitialSumsScreen';


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
          name="PrehistoricForms" 
          component={PrehistoricFormsScreen} 
          options={{ gestureEnabled: false }} 
        />
        <Stack.Screen 
          name="RocasMisteriosas" 
          component={RocasMisteriosasScreen} 
          options={{ gestureEnabled: false }} 
        />
        <Stack.Screen 
          name="SombrasCambiantes" 
          component={SombrasCambiantesScreen}
          options={{ headerShown: false }}
        />
        {/* Mundo 2 */}
        <Stack.Screen 
          name="CrystalCave" 
          component={CrystalCaveScreen} 
          options={{ gestureEnabled: false }}
        />

        {/* Mundo 3 */}
        <Stack.Screen 
          name="GoldenFruits" 
          component={GoldenFruitsScreen} 
          options={{ gestureEnabled: false }}
        />

        {/* Mundo 4 */}
        <Stack.Screen 
          name="BrightComparisons" 
          component={BrightComparisonsScreen} 
          options={{ gestureEnabled: false }}
        />

        {/* Mundo 5 */}
        <Stack.Screen 
          name="InitialSums" 
          component={InitialSumsScreen} 
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