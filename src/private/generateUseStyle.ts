import * as React from 'react';
import type { StyleSheet } from 'react-native';

import type { StyleRef, VariantStyleRef } from '../types';

export function createStyle<
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

  return [...composedStyleSheets, styleSheet];
}

export function generateUseStyle(ThemeContext: any) {
  return function useStyle<T>(styleRef: StyleRef<T> | Array<StyleRef<T>>) {
    const { theme } = React.useContext<any>(ThemeContext);

    if (Array.isArray(styleRef)) {
      return styleRef.map((styleRef) =>
        createStyle({ styleRef, themeId: theme._id })
      );
    }
    return createStyle({
      styleRef: styleRef as StyleRef<T>,
      themeId: theme._id,
    });
  };
}

export function generateUseStyleVariants(ThemeContext: any) {
  return function useStyleVariants<T, V extends Record<string, StyleRef<T>>>(
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
  };
}
