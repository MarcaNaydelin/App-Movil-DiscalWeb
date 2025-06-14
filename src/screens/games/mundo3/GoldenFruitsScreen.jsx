import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppColors, Colors } from '../../../styles/colors';
import HeaderBar from '../../../components/common/HeaderBar';
import ComingSoonLevel from '../../../components/common/ComingSoonLevel';

const GoldenFruitsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const levels = [
    {
      id: 1,
      name: 'Huerto Pequeño',
      description: 'Cuenta frutas del 1 al 3',
      isAvailable: false
    },
    {
      id: 2,
      name: 'Jardín Dorado',
      description: 'Cuenta frutas del 4 al 7',
      isAvailable: false
    },
    {
      id: 3,
      name: 'Valle Completo',
      description: 'Domina el conteo del 1 al 10',
      isAvailable: false
    }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[AppColors.accentYellow, '#FFD700']}
        style={[styles.background, { paddingTop: insets.top }]}
      >
        <HeaderBar 
          title="Valle de Frutas Doradas" 
          onBack={() => navigation.goBack()} 
          stars={0}
        />
        
        <View style={styles.worldInfoContainer}>
          <Text style={styles.worldTitle}>🍎 Valle del Conteo</Text>
          <Text style={styles.worldDescription}>
            Recorre el valle mágico donde las frutas doradas te enseñan a contar del 1 al 10
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
                  worldTheme="pastel"
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
    color: AppColors.primaryPurple,
    marginBottom: 8,
  },
  worldDescription: {
    fontSize: 16,
    color: AppColors.primaryPurple,
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

export default GoldenFruitsScreen;