import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Colors, AppColors } from "../styles/colors";
import HeaderBar from "../components/common/HeaderBar";
import BottomTabBar from "../navigation/BottomTabBar";
import MascotBubble from "../components/common/MascotBubble";

const AchievementsScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("stars");
  const [progress, setProgress] = useState({ current: 3, total: 19 });

  const categories = [
    { id: "stars", title: "Estrellas Matemáticas", count: 2 },
    { id: "medals", title: "Medallas de Campeón", count: 1 },
    { id: "special", title: "Trofeos Especiales", count: 0 },
    { id: "crowns", title: "Coronas Reales", count: 0 },
    { id: "gems", title: "Gemas Mágicas", count: 0 },
  ];

  const trophyData = {
    stars: [
      {
        id: "bronze",
        title: "Estrella de Bronce",
        unlocked: true,
        image: require("../../assets/img/trofeos/estrella.png"),
      },
      {
        id: "silver",
        title: "Estrella de Plata",
        unlocked: true,
        image: require("../../assets/img/trofeos/estrella.png"),
      },
      {
        id: "gold",
        title: "Estrella de Oro",
        unlocked: false,
        locked: true,
        image: require("../../assets/img/trofeos/estrella.png"),
      },
      {
        id: "diamond",
        title: "Estrella de Diamante",
        unlocked: false,
        locked: true,
        image: require("../../assets/img/trofeos/estrella.png"),
      },
      {
        id: "super",
        title: "Superestrella",
        unlocked: false,
        locked: true,
        image: require("../../assets/img/trofeos/estrella.png"),
      },
    ],
    medals: [
      {
        id: "suma",
        title: "Sumador Novato",
        unlocked: true,
        description: "¡Completaste 10 sumas correctas!",
      },
      {
        id: "suma-experto",
        title: "Sumador Experto",
        unlocked: true,
        description: "¡Completaste 50 sumas correctas!",
      },
      {
        id: "suma-maestro",
        title: "Maestro de la Suma",
        unlocked: false,
        progress: 50,
        description: "¡Completaste 100 sumas correctas!",
      },
    ],
    special: [
      { id: "combo", title: "Combo Matemático", unlocked: false, locked: true },
      {
        id: "velocidad",
        title: "Velocista Numérico",
        unlocked: false,
        locked: true,
      },
    ],
    crowns: [
      {
        id: "corona-bronce",
        title: "Corona de Bronce",
        unlocked: false,
        locked: true,
      },
      {
        id: "corona-plata",
        title: "Corona de Plata",
        unlocked: false,
        locked: true,
      },
    ],
    gems: [
      { id: "gema-azul", title: "Gema Azul", unlocked: false, locked: true },
      { id: "gema-roja", title: "Gema Roja", unlocked: false, locked: true },
    ],
  };

  const renderTrophies = () => {
    const trophies = trophyData[selectedCategory] || [];

    if (selectedCategory === "medals") {
      return (
        <View style={styles.medalsList}>
          {trophies.map((trophy) => (
            <Animatable.View
              key={trophy.id}
              animation="fadeIn"
              duration={500}
              style={styles.medalItem}
            >
              <View
                style={[
                  styles.medalIcon,
                  trophy.unlocked ? styles.unlockedMedal : styles.lockedMedal,
                ]}
              >
                <Ionicons
                  name="ribbon-outline"
                  size={28}
                  color={trophy.unlocked ? Colors.mint.primary : "#CCCCCC"}
                />
              </View>
              <View style={styles.medalContent}>
                <Text style={styles.medalTitle}>{trophy.title}</Text>
                <Text style={styles.medalDescription}>
                  {trophy.description}
                </Text>
                {trophy.progress !== undefined && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${trophy.progress}%` },
                        ]}
                      />
                    </View>
                  </View>
                )}
              </View>
              {trophy.unlocked && (
                <View style={styles.starBadge}>
                  <Ionicons
                    name="star"
                    size={16}
                    color={AppColors.accentYellow}
                  />
                </View>
              )}
            </Animatable.View>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.trophyGrid}>
        {trophies.map((trophy) => (
          <Animatable.View
            key={trophy.id}
            animation="zoomIn"
            duration={500}
            style={styles.trophyItem}
          >
            <View style={styles.trophyImageContainer}>
              {trophy.locked ? (
                <View style={styles.lockedOverlay}>
                  <Ionicons name="lock-closed" size={24} color="#F5CB5C" />
                </View>
              ) : null}
              <View
                style={[
                  styles.trophyCircle,
                  trophy.unlocked ? styles.unlockedTrophy : styles.lockedTrophy,
                ]}
              >
                {trophy.image ? (
                  <Image
                    source={trophy.image}
                    style={styles.trophyImage}
                    resizeMode="contain"
                  />
                ) : (
                  <Ionicons
                    name="trophy-outline"
                    size={40}
                    color={trophy.unlocked ? "white" : "#CCCCCC"}
                  />
                )}
              </View>
              {trophy.unlocked && !trophy.locked && (
                <View style={styles.starIndicator}>
                  <Ionicons
                    name="star"
                    size={16}
                    color={AppColors.accentYellow}
                  />
                </View>
              )}
            </View>
            <Text
              style={[styles.trophyTitle, trophy.locked && styles.lockedText]}
            >
              {trophy.title}
            </Text>
          </Animatable.View>
        ))}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[
        Colors.background.gradient.start,
        Colors.background.gradient.end,
      ]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        
        <HeaderBar
          title="Mi Colección"
          onBack={() => navigation.goBack()}
          stars={15}
        />

        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Mascot message */}
          <MascotBubble
            message="¡Sigue practicando para desbloquear más trofeos!"
            mascotType="happy"
            style={styles.mascotBubble}
          />

          <View style={styles.header}>
            <Animatable.Text animation="bounceInDown" duration={1200} style={styles.headerTitle}>
              🏆 MI COLECCIÓN DE TROFEOS 🏆
            </Animatable.Text>
            <Text style={styles.headerSubtitle}>
              ¡Colecciona todos los trofeos matemáticos!
            </Text>

            <View style={styles.progressSection}>
              <Text style={styles.progressCounter}>⭐ {progress.current}/{progress.total}</Text>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${(progress.current / progress.total) * 100}%` },
                  ]}
                />
              </View>
            </View>
          </View>

          {/* Categories Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryTabsContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryTab,
                  selectedCategory === category.id && styles.selectedCategoryTab,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.categoryTitle,
                    selectedCategory === category.id &&
                      styles.selectedCategoryTitle,
                  ]}
                >
                  {category.title}
                </Text>
                {category.count > 0 && (
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{category.count}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Trophy Content */}
          <View style={styles.trophiesContainer}>
            <Text style={styles.categoryHeader}>
              {categories.find((c) => c.id === selectedCategory)?.title ||
                "Trofeos"}
            </Text>

            {renderTrophies()}
          </View>
        </ScrollView>

        <BottomTabBar
          currentTab="achievements"
          onTabPress={(tabId) => {
            if (tabId === "home") {
              navigation.navigate("Home");
            } else if (tabId === "games") {
              navigation.navigate("GameMenu");
            } else if (tabId === "profile") {
            }
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },  
  headerSubtitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 16,
    opacity: 0.9,
  },
  progressSection: {
    width: "100%",
    marginBottom: 16,
  },
  progressCounter: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginBottom: 5,
    fontSize: 16,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: AppColors.accentYellow,
    borderRadius: 5,
  },
  categoryTabsContainer: {
    paddingVertical: 10,
  },
  categoryTab: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedCategoryTab: {
    backgroundColor: "white",
  },
  categoryTitle: {
    color: "white",
    fontWeight: "500",
  },
  selectedCategoryTitle: {
    color: AppColors.primaryPurple,
  },
  categoryBadge: {
    backgroundColor: AppColors.accentYellow,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  categoryBadgeText: {
    color: AppColors.primaryPurple,
    fontSize: 12,
    fontWeight: "bold",
  },
  trophiesContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: AppColors.primaryPurple,
    marginBottom: 15,
    textAlign: "center",
  },
  trophyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  trophyItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
  },
  trophyImageContainer: {
    position: "relative",
    marginBottom: 8,
  },
  trophyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  unlockedTrophy: {
    backgroundColor: "rgba(255, 255, 155, 0.3)",
    borderColor: AppColors.accentYellow,
  },
  lockedTrophy: {
    backgroundColor: "rgba(200, 200, 200, 0.2)",
    borderColor: "#DDDDDD",
  },
  trophyImage: {
    width: 50,
    height: 50,
  },
  trophyTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: AppColors.primaryPurple,
    textAlign: "center",
  },
  lockedText: {
    color: "#999999",
  },
  lockedOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 40,
    height: 40,
    marginLeft: -20,
    marginTop: -20,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  starIndicator: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "white",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.accentYellow,
  },
  medalsList: {
    width: "100%",
  },
  medalItem: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(107, 85, 174, 0.2)",
  },
  medalIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 2,
  },
  unlockedMedal: {
    backgroundColor: "rgba(166, 241, 224, 0.3)",
    borderColor: Colors.mint.primary,
  },
  lockedMedal: {
    backgroundColor: "rgba(200, 200, 200, 0.2)",
    borderColor: "#DDDDDD",
  },
  medalContent: {
    flex: 1,
  },
  medalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: AppColors.primaryPurple,
    marginBottom: 3,
  },
  medalDescription: {
    fontSize: 14,
    color: "#666666",
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(107, 85, 174, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.mint.primary,
    borderRadius: 3,
  },
  starBadge: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: AppColors.accentYellow,
  },
  mascotBubble: {
    marginVertical: 10,
  },
});

export default AchievementsScreen;