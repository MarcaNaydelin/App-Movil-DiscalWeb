import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../styles/colors';
import { useAppContext } from '../../../context/AppContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GameCard from '../../../components/game/GameCard';
import MascotBubble from '../../../components/common/MascotBubble';
import ComingSoonLevel from '../../../components/common/ComingSoonLevel';

const PrehistoricFormsScreen = ({ navigation }) => {
  const { prehistoricGames } = useAppContext();
  const insets = useSafeAreaInsets();

  const gamesData = [
    {
      id: 'rocasMisteriosas',
      title: 'Rocas Misteriosas',
      description: 'Encuentra las formas ocultas en las rocas prehistóricas',
      level: 1,
      stars: prehistoricGames.rocasMisteriosas.stars,
      color: Colors.states.success,
      icon: '🪨',
      locked: !prehistoricGames.rocasMisteriosas.unlocked,
      onPress: () => navigation.navigate('RocasMisteriosas')
    },
    {
      id: 'sombrasCambiantes',
      title: 'Sombras Cambiantes',
      description: 'Observa las sombras y adivina qué forma prehistoric se esconde',
      level: 2,
      stars: prehistoricGames.sombrasCambiantes.stars,
      color: Colors.states.warning,
      icon: '🌒',
      locked: !prehistoricGames.sombrasCambiantes.unlocked,
      onPress: () => navigation.navigate('SombrasCambiantes')
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.background.gradient.start, Colors.background.gradient.end]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Zona de las Formas Prehistóricas</Text>

          <View style={styles.headerInfo}>
            <Ionicons name="star" size={24} color={Colors.accentYellow} />
            <Text style={styles.headerText}>
              {prehistoricGames.rocasMisteriosas.stars + prehistoricGames.sombrasCambiantes.stars}
            </Text>
          </View>
        </View>

        {/* Mascot Welcome */}
        <View style={styles.mascotContainer}>
          <MascotBubble
            message="¡Bienvenido a la era prehistórica! Descubre las formas ocultas en este mundo antiguo."
            mascotType="thinking"
            theme="default"
            bubblePosition="right"
          />
        </View>

        {/* Games List */}
        <ScrollView
          style={styles.gamesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gamesContent}
        >
          <Text style={styles.sectionTitle}>Niveles Disponibles</Text>

          {gamesData.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              level={game.level}
              stars={game.stars}
              color={game.color}
              icon={game.icon}
              locked={game.locked}
              onPress={game.onPress}
            />
          ))}
          <ComingSoonLevel
            levelNumber={3}
            title="Nivel 3: Próximamente"
            subtitle="Nuevas aventuras prehistóricas están en camino..."
            worldTheme="mundo1"
            size="medium"
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  mascotContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  gamesContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  gamesContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  comingSoonCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderStyle: 'dashed',
  },
  comingSoonContent: {
    alignItems: 'center',
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 5,
  },
  comingSoonDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});

export default PrehistoricFormsScreen;