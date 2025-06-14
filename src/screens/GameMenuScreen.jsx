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
  
  const games = [
    {
      id: 'prehistoric_forms',
      name: 'Formas Prehistóricas',
      description: 'Descubre las figuras ocultas en rocas jurásicas',
      category: 'formas',
      level: 1,
      stars: 0,
      icon: '🦕',
      color: Colors.mundo1.primary
    },
    {
      id: 'crystal_cave',
      name: 'Cueva de Cristales Numéricos',
      description: 'Explora números mágicos en cristales brillantes (0-9)',
      category: 'numeros',
      level: 1,
      stars: 0,
      icon: '💎',
      color: AppColors.primaryBlue
    },
    {
      id: 'golden_fruits',
      name: 'Valle de Frutas Doradas',
      description: 'Aprende a contar del 1 al 10 con frutas deliciosas',
      category: 'conteo',
      level: 1,
      stars: 0,
      icon: '🍎',
      color: AppColors.accentYellow
    },
    {
      id: 'bright_comparisons',
      name: 'Río de Comparaciones Brillantes',
      description: 'Compara cantidades en aguas cristalinas',
      category: 'comparaciones',
      level: 2,
      stars: 0,
      icon: '⚖️',
      color: AppColors.mintGreen
    },
    {
      id: 'initial_sums',
      name: 'Bosque de Sumas Iniciales',
      description: 'Primeras sumas hasta 5, luego hasta 10',
      category: 'sumas',
      level: 2,
      stars: 0,
      icon: '🌳',
      color: AppColors.accentPink
    }
  ];

  const handleGamePress = (game) => {
    switch (game.id) {
      case 'prehistoric_forms':
        navigation.navigate('PrehistoricForms');
        break;
      case 'crystal_cave':
        navigation.navigate('CrystalCave');
        break;
      case 'golden_fruits':
        navigation.navigate('GoldenFruits');
        break;
      case 'bright_comparisons':
        navigation.navigate('BrightComparisons');
        break;
      case 'initial_sums':
        navigation.navigate('InitialSums');
        break;
      default:
        // Navegar a una pantalla de "próximamente" o mostrar alerta
        console.log(`Juego ${game.id} no implementado aún`);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[AppColors.primaryPurple, AppColors.primaryBlue]}
        style={[styles.background, { paddingTop: insets.top }]}
      >
        <HeaderBar 
          title="Mundos Mágicos" 
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
                  1: AppColors.primaryBlue,
                  2: AppColors.accentYellow,
                  3: AppColors.accentPink,
                }}
                onPress={() => handleGamePress(game)}
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