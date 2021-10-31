import type { StyleSheet } from 'react-native';

import type { StylesInput, ThemeMap, ThemeVars, Tokens } from '../types';
import { getStyleSheets } from './getStyleSheets';

export function generateStyleFn<ThemeTokens extends Tokens>(
  themeMap: ThemeMap<ThemeTokens>
) {
  return <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
    styles: ((vars: ThemeVars<ThemeTokens>) => StylesInput<T>) | StylesInput<T>
  ) => {
    const { _styleSheet, _composedStyleSheets } = getStyleSheets({
      themeMap,
      getStyles: ({ themeId }) =>
        typeof styles === 'function' ? styles(themeMap[themeId]) : styles,
    });
    return {
      _styleSheet,
      _composedStyleSheets,
    };
  };
}
