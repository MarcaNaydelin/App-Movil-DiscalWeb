// App theme colors
const primaryBlue = '#6EA7C1';
const primaryPurple = '#6B55AE';
const accentPink = '#E67FA2';
const accentYellow = '#FFEFA1';

// Functional color assignments
export const Colors = {
  // UI Elements
  text: {
    primary: '#11181C',     // Main text color
    secondary: '#687076',   // Subtitle, captions
    light: '#FFFFFF',       // Text on dark backgrounds
    highlight: primaryPurple, // Important text, headlines
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
  // State colors
  states: {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: primaryBlue,
  },
  // Mascot moods
  mascot: {
    greeting: primaryBlue,
    talking: primaryPurple,
    excited: accentPink,
    happy: accentYellow,
  }
};

// Raw colors for direct use
export const AppColors = {
  primaryBlue,
  primaryPurple,
  accentPink,
  accentYellow,
};