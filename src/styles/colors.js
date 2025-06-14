const primaryBlue = '#6EA7C1';
const primaryPurple = '#6B55AE';
const accentPink = '#E67FA2';
const accentYellow = '#FFEFA1';
const mintGreen = '#A6F1E0';
const softPastel = '#F4F8D3';

export const Colors = {
  mundo1: {
    rock: '#8B4513',
    cave: '#654321',
    primary: '#F0E68C',
    secondary: '#EEE8AA',
    accent: '#DAA520',
    light: '#FFF8DC',
  },

  // Estados y niveles
  states: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // Niveles de dificultad
  difficulty: {
    easy: '#10B981',    // Verde
    medium: '#F59E0B',  // Amarillo
    hard: '#EC4899',    // Rosa
  },

  text: {
    primary: '#11181C',
    secondary: '#687076',
    light: '#FFFFFF',
    highlight: primaryPurple,
  },

  background: {
    primary: '#FFFFFF',
    secondary: '#F5F7FA',
    gradient: {
      start: primaryBlue,
      end: primaryPurple,
    }
  },

  button: {
    primary: {
      gradient: {
        start: primaryPurple,
        end: accentPink,
      },
      text: '#FFFFFF',
    },
    secondary: {
      background: accentYellow,
      text: primaryPurple,
    },
    disabled: {
      background: '#CCCCCC',
      text: '#888888',
    }
  },

  // Component specific
  messageCloud: {
    background: '#FFFFFF',
    border: accentYellow,
    text: primaryPurple,
  },

  progressBar: {
    background: 'rgba(255, 255, 255, 0.3)',
    fill: accentYellow,
  },

  // Mascot moods
  mascot: {
    greeting: primaryBlue,
    talking: primaryPurple,
    excited: accentPink,
    happy: accentYellow,
  },

  mint: {
    primary: mintGreen,
    light: mintGreen + '80',
    dark: '#74D9C8',
  },

  pastel: {
    primary: softPastel,
    light: softPastel + '80',
    dark: '#DDE2B2',
  },

  // NUEVAS PROPIEDADES FALTANTES
  primary: {
    yellow: accentYellow,
    mint: mintGreen,
    blue: primaryBlue,
    purple: primaryPurple,
    pink: accentPink,
  },

  // Overlay colors
  overlay: {
    light: 'rgba(255, 255, 255, 0.15)',
    medium: 'rgba(255, 255, 255, 0.25)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },

  // Feedback colors
  feedback: {
    correct: '#10B981',    // Verde para respuesta correcta
    incorrect: '#EF4444',  // Rojo para respuesta incorrecta
    hint: '#F59E0B',       // Amarillo para pistas
    neutral: '#6B7280',    // Gris para neutral
  },
};

export const AppColors = {
  primaryBlue,
  primaryPurple,
  accentPink,
  accentYellow,
  mintGreen,
  softPastel,
};