import { createTheme, createStyleFn } from '../src';

export const [themeA, vars] = createTheme({
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

export const themeB = createTheme(vars, {
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

export const { style, styleVariants } = createStyleFn(themeA, themeB);
