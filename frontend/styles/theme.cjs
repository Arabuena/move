module.exports = {
  colors: {
    primary: {
      DEFAULT: '#520578',
      light: '#6B0A9C',
      dark: '#3D0459',
      50: '#F6F0FB',
      100: '#EBD9F7',
      200: '#D7B3F0',
      300: '#C38DE9',
      400: '#A459DD',
      500: '#8A2BE2',
      600: '#520578',
      700: '#3D0459',
      800: '#29033C',
      900: '#14021F',
    },
    white: '#FFFFFF',
    background: '#F3F4F6',
    text: {
      DEFAULT: '#1F2937',
      light: '#6B7280',
    },
    success: '#059669',
    error: '#DC2626',
    warning: '#D97706',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    }
  },
  fontFamily: {
    sans: ['Inter', 'sans-serif']
  },
  extend: {
    spacing: {
      'safe-top': 'env(safe-area-inset-top)',
      'safe-bottom': 'env(safe-area-inset-bottom)',
    },
    backgroundImage: {
      'gradient-primary': 'linear-gradient(135deg, #520578 0%, #3D0459 100%)',
    },
    borderRadius: {
      'xl': '1rem',
      '2xl': '1.5rem',
    },
    boxShadow: {
      'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
    }
  }
}; 