import { Platform } from 'react-native';
import { createTheme, createStyleFn } from '@wagmi/styles';

const ios = Platform.OS === 'ios';

export const [themeA, vars] = createTheme({
  colors: {
    primary: 'blue',
    secondary: 'hotpink',
  },
  fontFamilies: {
    default: 'SFProRounded',
  },
  fontMetrics: {
    default: {
      capHeight: 1443,
      ascent: 1950,
      descent: -494,
      lineGap: 0,
      unitsPerEm: 2048,
      marginCorrection: {
        23: ios ? -0.3 : -0.3,
        20: ios ? -0.5 : -0.2,
        18: ios ? 0.4 : 0.2,
        16: ios ? -0.5 : 2.4,
        14: ios ? -0.3 : -0.1,
      },
    },
  },
  fontWeights: {
    default: {
      regular: {
        fontFamilySuffix: '',
      },
      medium: {
        fontFamilySuffix: 'Medium',
      },
      heavy: {
        fontFamilySuffix: 'Heavy',
      },
    },
  },
  sizes: {
    small: 200,
    medium: 400,
    large: 600,
  },
  textSizes: {
    default: {
      body: {
        fontSize: 60,
        lineHeight: 72,
        letterSpacing: 0.5,
      },
    },
  },
});

export const themeB = createTheme(vars, {
  colors: {
    primary: 'red',
    secondary: 'black',
  },
  fontFamilies: {
    default: 'SFProRounded',
  },
  fontMetrics: {
    default: {
      capHeight: 1443,
      ascent: 1950,
      descent: -494,
      lineGap: 0,
      unitsPerEm: 2048,
      marginCorrection: {
        23: ios ? -0.3 : -0.3,
        20: ios ? -0.5 : -0.2,
        18: ios ? 0.4 : 0.2,
        16: ios ? -0.5 : 2.4,
        14: ios ? -0.3 : -0.1,
      },
    },
  },
  fontWeights: {
    default: {
      regular: {
        fontFamilySuffix: '',
      },
      medium: {
        fontFamilySuffix: 'Medium',
      },
      heavy: {
        fontFamilySuffix: 'Heavy',
      },
    },
  },
  sizes: {
    small: 100,
    medium: 200,
    large: 300,
  },
  textSizes: {
    default: {
      body: {
        fontSize: 23,
        lineHeight: 27,
        letterSpacing: 0.6,
      },
    },
  },
});

export const style = createStyleFn(themeA, themeB);
