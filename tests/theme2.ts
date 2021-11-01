import { createTheme, buildTheme } from '../src';

export const themeC = createTheme({
  colors: {
    primary: 'green',
    secondary: 'yellow',
  },
  spacings: {
    small: 4,
    medium: 8,
    large: 16,
  },
  sizes: {
    small: 50,
    medium: 100,
    large: 200,
  },
});

export const themeD = createTheme(themeC, {
  colors: {
    primary: 'red',
    secondary: 'black',
  },
  spacings: {
    small: 8,
    medium: 16,
    large: 32,
  },
  sizes: {
    small: 400,
    medium: 600,
    large: 800,
  },
});

export const {
  style,
  styleVariants,
  ThemeProvider,
  useStyle,
  useStyleVariants,
} = buildTheme(themeC, themeD);
