import * as React from 'react';
import type { StyleSheet } from 'react-native';

import { ThemeContext } from './ThemeProvider';
import type { StyleRef, StyleRefInput } from './types';

function createStyle<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>({ styleRef, themeId }: { styleRef: StyleRef<T>; themeId: string }) {
  let styleSheet;
  if (styleRef._styleSheet) {
    styleSheet = styleRef._styleSheet[themeId];
  }

  let composedStyleSheets: Array<T> = [];
  if (styleRef._composedStyleSheets) {
    composedStyleSheets = styleRef._composedStyleSheets[themeId] || [];
  }

  return [styleSheet, ...composedStyleSheets];
}

export function useStyle<T>(styleRef: StyleRefInput<T>) {
  const { theme } = React.useContext<any>(ThemeContext);

  if (styleRef._styleSheet) {
    return createStyle({
      styleRef: styleRef as StyleRef<T>,
      themeId: theme._id,
    });
  }

  return Object.entries(styleRef).reduce(
    (currentStyle, [variantKey, styleRef]) => {
      return {
        ...currentStyle,
        [variantKey]: createStyle({ styleRef, themeId: theme._id }),
      };
    },
    {}
  );
}
