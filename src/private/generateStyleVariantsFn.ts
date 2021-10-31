import type { StyleSheet } from 'react-native';

import type { StylesInput, ThemeMap, ThemeVars, Tokens } from '../types';
import { getStyleSheets } from './getStyleSheets';

export function generateStyleVariantsFn<ThemeTokens extends Tokens>(
  themeMap: ThemeMap<ThemeTokens>
) {
  return <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
    styles:
      | ((vars: ThemeVars<ThemeTokens>) => {
          [variant: string]: StylesInput<T>;
        })
      | { [variant: string]: StylesInput<T> }
  ) => {
    const variantKeys =
      typeof styles === 'function'
        ? Object.keys(styles(themeMap[Object.keys(themeMap)[0]]))
        : Object.keys(styles);

    const variantMap = variantKeys.reduce((currentVariants, variantKey) => {
      const { _styleSheet, _composedStyleSheets } = getStyleSheets({
        themeMap,
        getStyles: ({ themeId }) =>
          typeof styles === 'function'
            ? styles(themeMap[themeId])[variantKey]
            : styles[variantKey],
      });
      return {
        ...currentVariants,
        [variantKey]: {
          _styleSheet,
          _composedStyleSheets,
        },
      };
    }, {});

    return variantMap;
  };
}