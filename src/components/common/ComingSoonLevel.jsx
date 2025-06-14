import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 380;

const ComingSoonLevel = ({ 
  levelNumber = 3, 
  title = "Próximamente",
  subtitle = "Nuevas aventuras prehistóricas están en camino...",
  worldTheme = "default",
  size = "medium",
  showAnimation = true 
}) => {

  const getThemeColors = (theme) => {
    const themes = {
      default: {
        background: [Colors.primary.purple, Colors.accentPink],
        cardBg: '#F0EBF9',
        border: Colors.primary.purple,
        text: Colors.primary.purple,
        accent: Colors.accentPink,
      },
      mint: {
        background: [Colors.mint.primary, Colors.mint.dark],
        cardBg: '#D9F6F0',
        border: Colors.mint.dark,
        text: Colors.text.primary,
        accent: Colors.mint.dark,
      },
      pastel: {
        background: [Colors.pastel.primary, Colors.pastel.dark],
        cardBg: '#F6F9DC',
        border: Colors.pastel.dark,
        text: Colors.text.primary,
        accent: Colors.primary.purple,
      },
      mundo1: {
        background: [Colors.mundo1.primary, Colors.mundo1.accent],
        cardBg: '#FFFBE7',
        border: Colors.mundo1.accent,
        text: Colors.mundo1.cave,
        accent: Colors.mundo1.rock,
      },
    };
    return themes[theme] || themes.default;
  };

  const theme = getThemeColors(worldTheme);

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border, shadowColor: theme.border }]}>      
      <View style={styles.header}>
        <Ionicons name="lock-closed" size={20} color={theme.accent} style={{ marginRight: 6 }} />
        <Text style={[styles.levelText, { color: theme.text }]}>Nivel {levelNumber}</Text>
      </View>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.85,
    textAlign: 'center',
  },
});

export default ComingSoonLevel;