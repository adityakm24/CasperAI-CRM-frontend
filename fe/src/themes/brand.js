// src/theme/brand.js
import { extendTheme } from '@chakra-ui/react';

const brandTheme = extendTheme({
  colors: {
    gray: {
      900: '#0A0A0A',
      800: '#1A1A1A',
      700: '#2A2A2A',
      600: '#3A3A3A',
    },
    blue: {
      500: '#008AFF',
      600: '#006fd1',
      700: '#015aa8',
    },
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'lg',
      },
    },
    Input: {
      baseStyle: {
        field: {
          fontWeight: 'medium',
          borderRadius: 'lg',
        },
      },
    },
  },
});

export default brandTheme;