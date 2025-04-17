import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppColors, Colors } from '../styles/colors';
import GameCard from '../components/game/GameCard';
import HeaderBar from '../components/common/HeaderBar';
import BottomTabBar from '../navigation/BottomTabBar';
import ProfileAvatar from '../components/common/ProfileAvatar';

const GameMenuScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  // Datos de juegos con colores mejorados según niveles
  const games = [
    { 
      id: 'suma_espacial', 
      name: 'Suma Espacial', 
      description: 'Viaja al espacio sumando meteoritos', 
      category: 'suma', 
      level: 1, 
      stars: 2, 
      icon: '🚀',
      color: AppColors.primaryPurple
    },
    { 
      id: 'suma_frutas', 
      name: 'Suma Frutas', 
      description: 'Aprende a sumar con frutas deliciosas', 
      category: 'suma', 
      level: 2, 
      stars: 3, 
      icon: '🍎',
      color: AppColors.primaryBlue
    },
    { 
      id: 'suma_animales', 
      name: 'Suma Animales', 
      description: 'Suma con animales divertidos', 
      category: 'suma', 
      level: 3, 
      stars: 1, 
      icon: '🐶',
      color: AppColors.accentPink
    },
    { 
      id: 'resta_espacial', 
      name: 'Resta Espacial', 
      description: 'Viaja al espacio restando meteoritos', 
      category: 'resta', 
      level: 2, 
      stars: 3, 
      icon: '🌟',
      color: AppColors.accentPink
    },
    { 
      id: 'multi_magica', 
      name: 'Multiplicación Mágica', 
      description: 'Multiplica con el mago matemático', 
      category: 'multi', 
      level: 3, 
      stars: 1, 
      icon: '🧙‍♂️',
      color: AppColors.accentYellow
    },
    { 
      id: 'div_submarina', 
      name: 'División Submarina', 
      description: 'Divide tesoros bajo el mar', 
      category: 'div', 
      level: 2, 
      stars: 0, 
      icon: '🐠',
      color: Colors.states.info
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[AppColors.primaryPurple, AppColors.primaryBlue]}
        style={[styles.background, { paddingTop: insets.top }]}
      >
        <HeaderBar 
          title="Juegos" 
          onBack={() => navigation.goBack()} 
          stars={0}
          rightComponent={
            <ProfileAvatar 
              name="N"
              onPress={() => navigation.navigate('Profile')}
              size={40}
            />
          }
        />
        
        {/* Games Grid with bubble-styled container */}
        <View style={styles.gamesSectionContainer}>
          <ScrollView
            style={styles.gamesContainer}
            contentContainerStyle={styles.gamesContentContainer}
            showsVerticalScrollIndicator={false}
          >
            {games.map(game => (
              <GameCard
                key={game.id}
                title={game.name}
                description={game.description}
                level={game.level}
                stars={game.stars}
                color={game.color}
                icon={game.icon}
                levelColors={{
                  1: AppColors.primaryBlue, // Nivel 1 - Fácil - Azul
                  2: AppColors.accentYellow, // Nivel 2 - Medio - Amarillo
                  3: AppColors.accentPink, // Nivel 3 - Difícil - Rosa
                }}
                onPress={() => navigation.navigate('GamePlay', { gameId: game.id })}
              />
            ))}
          </ScrollView>
        </View>
      </LinearGradient>
      
      <BottomTabBar
        currentTab="games"
        onTabPress={(tab) => {
          if (tab === 'home') navigation.navigate('Welcome');
          if (tab === 'achievements') navigation.navigate('Achievements');
          if (tab === 'profile') navigation.navigate('Profile');
        }}
        style={{ paddingBottom: insets.bottom }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  gamesSectionContainer: {
    flex: 1,
    marginTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  gamesContainer: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  gamesContentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
});

export default GameMenuScreen;