// Animation constants for consistent timing and easing
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const;

export const ANIMATION_EASING = {
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  smooth: [0.25, 0.46, 0.45, 0.94],
} as const;

// Scroll animation variants for Framer Motion
export const SCROLL_ANIMATIONS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: ANIMATION_EASING.easeOut,
      },
    },
  },

  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: ANIMATION_EASING.easeOut,
      },
    },
  },

  slideDown: {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: ANIMATION_EASING.easeOut,
      },
    },
  },

  slideLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: ANIMATION_EASING.easeOut,
      },
    },
  },

  slideRight: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: ANIMATION_EASING.easeOut,
      },
    },
  },

  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: ANIMATION_EASING.easeOut,
      },
    },
  },

  scaleUpFade: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: ANIMATION_DURATION.slow,
        ease: ANIMATION_EASING.smooth,
      },
    },
  },

  rotateIn: {
    hidden: { opacity: 0, rotate: -10 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: ANIMATION_EASING.easeOut,
      },
    },
  },

  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: ANIMATION_EASING.easeOut,
      },
    },
  },

  glowPulse: {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
} as const;

// Parallax animation presets
export const PARALLAX_SPEEDS = {
  slow: -0.3,
  medium: -0.5,
  fast: -0.8,
} as const;

// Hover animations
export const HOVER_SCALE = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
};

export const HOVER_LIFT = {
  whileHover: { y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' },
  whileTap: { y: 0 },
  transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
};

export const HOVER_GLOW = {
  whileHover: { boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' },
  transition: { duration: ANIMATION_DURATION.fast },
} as const;
