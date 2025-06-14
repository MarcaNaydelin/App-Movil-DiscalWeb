import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppColors, Colors } from '../../../styles/colors';
import HeaderBar from '../../../components/common/HeaderBar';
import ComingSoonLevel from '../../../components/common/ComingSoonLevel';

const InitialSumsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const levels = [
    {
      id: 1,
      name: 'Claro del Bosque',
      description: 'Primeras sumas hasta 5',
      isAvailable: false
    },
    {
      id: 2,
      name: 'Sendero Encantado',
      description: 'Sumas intermedias hasta 10',
      isAvailable: false
    },
    {
      id: 3,
      name: 'Corazón del Bosque',
      description: 'Sumas avanzadas y combinadas',
      isAvailable: false
    }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[AppColors.accentPink, '#F472B6']}
        style={[styles.background, { paddingTop: insets.top }]}
      >
        <HeaderBar 
          title="Bosque de Sumas Iniciales" 
          onBack={() => navigation.goBack()} 
          stars={0}
        />
        
        <View style={styles.worldInfoContainer}>
          <Text style={styles.worldTitle}>🌳 Bosque Matemático</Text>
          <Text style={styles.worldDescription}>
            Adéntrate en el bosque mágico donde los árboles te enseñan los secretos de las sumas
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
                  worldTheme="default"
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
    color: '#FFFFFF',
    marginBottom: 8,
  },
  worldDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
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

export default InitialSumsScreen;