import { StyleSheet } from 'react-native';

import type { StylesInput, Tokens, ThemeMap } from '../types';

export function getStyleSheets<ThemeTokens extends Tokens>({
  themeMap,
  getStyles,
}: {
  themeMap: ThemeMap<ThemeTokens>;
  getStyles: ({ themeId }: { themeId: string }) => StylesInput<ThemeTokens>;
}) {
  let _composedStyleSheets: any = {};

  const themeStyles = Object.keys(themeMap).reduce((currentStyles, themeId) => {
    const providedStyles = getStyles({ themeId });

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
  }, {});

  return {
    _styleSheet: StyleSheet.create(themeStyles),
    _composedStyleSheets,
  };
}
