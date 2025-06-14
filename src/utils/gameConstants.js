// Formas básicas del Mundo 1 (originales)
export const BASIC_SHAPES = {
  CIRCLE: 'circle',
  SQUARE: 'square',
  TRIANGLE: 'triangle',
  RECTANGLE: 'rectangle',
};

// Nuevas formas para el segundo juego
export const ADVANCED_SHAPES = {
  CIRCLE: 'circle',
  SQUARE: 'square',
  TRIANGLE: 'triangle',
  RECTANGLE: 'rectangle',
  OVAL: 'oval',
  DIAMOND: 'diamond',
};

// Formas no geométricas como distractores
export const DISTRACTOR_SHAPES = {
  LEAF: 'leaf',
  BLOB: 'blob',
  STAR: 'star',
};

// Nombres en español para las formas
export const SHAPE_NAMES = {
  [BASIC_SHAPES.CIRCLE]: 'círculo',
  [BASIC_SHAPES.SQUARE]: 'cuadrado',
  [BASIC_SHAPES.TRIANGLE]: 'triángulo',
  [BASIC_SHAPES.RECTANGLE]: 'rectángulo',
  [ADVANCED_SHAPES.OVAL]: 'óvalo',
  [ADVANCED_SHAPES.DIAMOND]: 'rombo',
  [DISTRACTOR_SHAPES.LEAF]: 'cruz',
  [DISTRACTOR_SHAPES.BLOB]: 'luna',
  [DISTRACTOR_SHAPES.STAR]: 'estrella',
};

// Rutas de las imágenes de formas (las que ya tienes)
export const SHAPE_IMAGES = {
  [BASIC_SHAPES.CIRCLE]: require('../../assets/img/figuras/circulo.png'),
  [BASIC_SHAPES.SQUARE]: require('../../assets/img/figuras/cuadrado.png'),
  [BASIC_SHAPES.TRIANGLE]: require('../../assets/img/figuras/triangulo.png'),
  [BASIC_SHAPES.RECTANGLE]: require('../../assets/img/figuras/rectangulo.png'),
  // Nuevas formas que necesitarás agregar como imágenes
  [ADVANCED_SHAPES.OVAL]: require('../../assets/img/figuras/ovalo.png'),
  [ADVANCED_SHAPES.DIAMOND]: require('../../assets/img/figuras/rombo.png'),
  [DISTRACTOR_SHAPES.LEAF]: require('../../assets/img/figuras/cruz.png'),
  [DISTRACTOR_SHAPES.BLOB]: require('../../assets/img/figuras/luna.png'),
  [DISTRACTOR_SHAPES.STAR]: require('../../assets/img/figuras/estrella.png'),
};

// Configuración del juego Rocas Misteriosas
export const ROCAS_MISTERIOSAS_CONFIG = {
  TOTAL_EXERCISES: 12,
  SHAPES_PER_EXERCISE: 3,
  MAX_ATTEMPTS: 2,
  POINTS_PER_CORRECT: 10,
  STARS_THRESHOLD: {
    ONE: 40,    // 40% para 1 estrella
    TWO: 80,    // 80% para 2 estrellas
    THREE: 95,  // 95% para 3 estrellas
  }
};

// Configuración del juego Sombras Cambiantes
export const SOMBRAS_CAMBIANTES_CONFIG = {
  TOTAL_EXERCISES: 15,
  LINTERNAS_PER_EXERCISE: 4,
  MAX_ATTEMPTS: 2,
  POINTS_PER_CORRECT: 15,
  STARS_THRESHOLD: {
    ONE: 50,    // 50% para 1 estrella
    TWO: 75,    // 75% para 2 estrellas
    THREE: 90,  // 90% para 3 estrellas
  },
  ROTATIONS: [0, 45, 90, 135, 180], // Rotaciones posibles
  SCALE_VARIANTS: [0.8, 1.0, 1.2], // Variaciones de tamaño
};

// Mensajes de Dino-Amigo
export const DINO_MESSAGES = {
  WELCOME: "¡Hola, explorador! En estas rocas antiguas hay formas secretas.",
  FIND_SHAPE: "¡Ayúdame a encontrar el {shape}!",
  CORRECT: "¡Sí! ¡Ese es un {shape}! ¡Genial!",
  INCORRECT_FIRST: "Mmm, esa forma es un {incorrectShape}. Estamos buscando el {correctShape}. ¡Mira bien la forma de arriba e inténtalo de nuevo!",
  INCORRECT_SECOND: "¡Casi! El {correctShape} es este...",
  GAME_COMPLETE: "¡Increíble trabajo, explorador! Has dominado las formas prehistóricas.",
  ENCOURAGEMENT: "¡Sigue así! Cada forma que descubres nos acerca más al tesoro.",
  
  // Mensajes específicos para Sombras Cambiantes
  SHADOWS_WELCOME: "¡En la oscuridad, las formas pueden engañarnos! ¿Puedes encontrar la sombra del {shape}?",
  SHADOWS_CORRECT: "¡Exacto! ¡Esa es la sombra de un {shape}!",
  SHADOWS_INCORRECT_FIRST: "Esa no parece encajar con la sombra. ¡Prueba con otra linterna!",
  SHADOWS_INCORRECT_SECOND: "¡Casi! La forma correcta es esta... ¡Observa bien la sombra!",
  SHADOWS_HINT: "¡Fíjate bien en la forma de la sombra! A veces pueden estar rotadas o ser de diferente tamaño.",
};

// Configuración de audio (para futuras implementaciones)
export const AUDIO_CONFIG = {
  CORRECT_SOUND: 'correct.mp3',
  INCORRECT_SOUND: 'incorrect.mp3',
  BACKGROUND_MUSIC: 'prehistoric_theme.mp3',
  SHADOW_REVEAL: 'shadow_reveal.mp3',
};

// Instrucciones para cada juego
export const GAME_INSTRUCTIONS = {
  rocasMisteriosas: [
    {
      title: "¡Bienvenido, Explorador!",
      message: "¡Hola! Soy Dino-Amigo y necesito tu ayuda para descubrir las formas secretas escondidas en estas rocas prehistóricas.",
      icon: "happy-outline"
    },
    {
      title: "¿Cómo Jugar?",
      message: "Te mostraré una forma en la parte superior. Tu misión es encontrar esa misma forma entre las rocas de abajo. ¡Toca la roca correcta!",
      icon: "search"
    },
    {
      title: "¡Empecemos!",
      message: "¡Perfecto! Recuerda mirar bien la forma de arriba y buscar la igual abajo. ¡Tienes 2 intentos por cada forma!",
      icon: "play"
    }
  ],
  sombrasCambiantes: [
    {
      title: "¡La Cueva de las Sombras!",
      message: "¡Bienvenido a la cueva misteriosa! Aquí las formas se esconden como sombras en la oscuridad.",
      icon: "moon"
    },
    {
      title: "Usa tu Linterna",
      message: "Verás una sombra en la pared. Toca las linternas para iluminar las formas ocultas y encuentra cuál coincide con la sombra.",
      icon: "flashlight"
    },
    {
      title: "¡Cuidado con las Rotaciones!",
      message: "Las formas pueden estar rotadas o ser de diferente tamaño, pero mantendrán su forma original. ¡Observa bien los contornos!",
      icon: "refresh"
    },
    {
      title: "¡Listos para Explorar!",
      message: "¡Excelente! Usa tu ingenio para descifrar las sombras. ¡La aventura comienza ahora!",
      icon: "rocket"
    }
  ]
};