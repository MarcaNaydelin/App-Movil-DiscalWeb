import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderBar from '../components/common/HeaderBar';
import BottomTabBar from '../navigation/BottomTabBar';
import SkillProgressCard from '../components/common/SkillProgressCard';
import MascotBubble from '../components/common/MascotBubble';
import { Colors, AppColors } from '../styles/colors';

const HomeScreen = ({ navigation }) => {
  const [skills] = useState([
    { id: 1, title: 'Suma', progress: 5, icon: 'add' },
    { id: 2, title: 'Resta', progress: 10, icon: 'remove' },
    { id: 3, title: 'Multiplicación', progress: 15, icon: 'multiply' },
    { id: 4, title: 'División', progress: 20, icon: 'divide' },
  ]);

  const handleTabPress = (tabId) => {
    if (tabId === 'games') {
      navigation.navigate('GameMenu');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <LinearGradient
        colors={[AppColors.primaryBlue, Colors.mint.primary, AppColors.primaryPurple]}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          <HeaderBar title="Mis Habilidades" stars={15} />

          <View style={styles.bannerContainer}>
            <MascotBubble 
              message="¡Practica para mejorar tus habilidades!"
              style={styles.mascotBubble}
            />
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.skillsGrid}>
              {skills.map(skill => (
                <View style={styles.skillCardWrapper} key={skill.id}>
                  <SkillProgressCard
                    title={skill.title}
                    progress={skill.progress}
                    icon={skill.icon}
                  />
                </View>
              ))}
            </View>
          </ScrollView>

          <BottomTabBar
            currentTab="home"
            onTabPress={handleTabPress}
            style={styles.bottomTabBar}
          />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientBackground: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  safeArea: {
    flex: 1,
  },
  bannerContainer: {
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
  },
  mascotBubble: {
    width: '100%',
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 100,
    paddingTop: 15,
    alignItems: 'center',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 5,
    rowGap: 5,
  },
  skillCardWrapper: {
    marginHorizontal: 5,
    marginVertical: 2,
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
