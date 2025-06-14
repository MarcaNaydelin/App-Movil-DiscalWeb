import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppColors, Colors } from '../../../styles/colors';
import HeaderBar from '../../../components/common/HeaderBar';
import ComingSoonLevel from '../../../components/common/ComingSoonLevel';

const BrightComparisonsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const levels = [
    {
      id: 1,
      name: 'Arroyo Cristalino',
      description: 'Compara cantidades pequeñas (1-5)',
      isAvailable: false
    },
    {
      id: 2,
      name: 'Río Brillante',
      description: 'Comparaciones medianas (1-10)',
      isAvailable: false
    },
    {
      id: 3,
      name: 'Catarata Mágica',
      description: 'Comparaciones avanzadas y mixtas',
      isAvailable: false
    }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[AppColors.mintGreen, '#74D9C8']}
        style={[styles.background, { paddingTop: insets.top }]}
      >
        <HeaderBar 
          title="Río de Comparaciones Brillantes" 
          onBack={() => navigation.goBack()} 
          stars={0}
        />
        
        <View style={styles.worldInfoContainer}>
          <Text style={styles.worldTitle}>⚖️ Río de la Lógica</Text>
          <Text style={styles.worldDescription}>
            Navega por las aguas cristalinas donde aprenderás a comparar cantidades y tamaños
          </Text>
        </View>

        <View style={styles.levelsContainer}>
          <ScrollView
            contentContainerStyle={styles.levelsContent}
            showsVerticalScrollIndicator={false}
          >
            {levels.map((level, index) => (
              <View key={level.id} style={styles.levelWrapper}>
                <ComingSoonLevel
                  levelNumber={level.id}
                  title={level.name}
                  subtitle={level.description}
                  worldTheme="mint"
                  size="large"
                  showAnimation={true}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </LinearGradient>
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
  worldInfoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  worldTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  worldDescription: {
    fontSize: 16,
    color: Colors.text.primary,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
  },
  levelsContainer: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
  },
  levelsContent: {
    padding: 20,
    alignItems: 'center',
  },
  levelWrapper: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default BrightComparisonsScreen;