import * as React from 'react';
import type { StyleSheet } from 'react-native';

import { ThemeContext } from './ThemeProvider';
import type { StyleRef, VariantStyleRef } from './types';

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

export function useStyle<T>(styleRef: StyleRef<T>) {
  const { theme } = React.useContext<any>(ThemeContext);

  return createStyle({
    styleRef: styleRef as StyleRef<T>,
    themeId: theme._id,
  });
}

export function useStyleVariants<T, V extends Record<string, StyleRef<T>>>(
  styleRef: VariantStyleRef<T, V>
) {
  const { theme } = React.useContext<any>(ThemeContext);

  return Object.entries(styleRef).reduce(
    (currentStyle, [variantKey, styleRef]) => {
      return {
        ...currentStyle,
        [variantKey]: createStyle({ styleRef, themeId: theme._id }),
      };
    },
    {}
  ) as Record<keyof V, {}>;
}
