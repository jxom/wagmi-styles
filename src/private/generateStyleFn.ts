import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import type { ThemeVars, Tokens } from '../types';

export function generateStyleFn<ThemeTokens extends Tokens>(themeMap: {
  [id: string]: ThemeVars<ThemeTokens>;
}) {
  return <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
    styles:
      | ((vars: ThemeVars<ThemeTokens>) => ViewStyle | TextStyle | ImageStyle)
      | (ViewStyle | TextStyle | ImageStyle)
  ) => {
    const themeStyles = Object.keys(themeMap).reduce(
      (currentStyles, themeId) => {
        return {
          ...currentStyles,
          [themeId]:
            typeof styles === 'function' ? styles(themeMap[themeId]) : styles,
        };
      },
      {}
    );
    return StyleSheet.create(themeStyles);
  };
}
