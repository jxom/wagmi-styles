import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import type { ThemeVars, Tokens } from '../types';

type Styles = ViewStyle | TextStyle | ImageStyle;
type StylesSet<T> = Array<T | Styles>;

export function generateStyleFn<ThemeTokens extends Tokens>(themeMap: {
  [id: string]: ThemeVars<ThemeTokens>;
}) {
  return <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
    styles: ((vars: ThemeVars<ThemeTokens>) => Styles | StylesSet<T>) | Styles
  ) => {
    let _composedStyleSheets: any = {};

    const themeStyles = Object.keys(themeMap).reduce(
      (currentStyles, themeId) => {
        const providedStyles =
          typeof styles === 'function' ? styles(themeMap[themeId]) : styles;

        let generatedStyles = providedStyles;
        if (Array.isArray(providedStyles)) {
          generatedStyles = providedStyles.reduce(
            (currentGeneratedStyles, providedStyle: any) => {
              if (providedStyle._styleSheet) {
                _composedStyleSheets = {
                  ..._composedStyleSheets,
                  [themeId]: [
                    ...(_composedStyleSheets?.[themeId] || []),
                    providedStyle._styleSheet[themeId],
                  ],
                };
                return currentGeneratedStyles;
              }
              return {
                ...currentGeneratedStyles,
                ...providedStyle,
              };
            },
            {}
          );
        }

        return {
          ...currentStyles,
          [themeId]: generatedStyles,
        };
      },
      {}
    );

    return {
      _styleSheet: StyleSheet.create(themeStyles),
      _composedStyleSheets,
    };
  };
}
