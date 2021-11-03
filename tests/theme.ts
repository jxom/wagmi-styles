import { createTheme, buildTheme } from '../src';

export const themeA = createTheme({
  colors: {
    primary: 'blue',
    secondary: 'hotpink',
  },
  sizes: {
    small: 100,
    medium: 200,
    large: 300,
  },
});

export const themeB = createTheme(themeA, {
  colors: {
    primary: 'red',
    secondary: 'black',
  },
  sizes: {
    small: 200,
    medium: 400,
    large: 600,
  },
});

export const {
  style,
  styleVariants,
  styled,
  ThemeProvider,
  useStyle,
  useStyleVariants,
} = buildTheme(themeA, themeB);
