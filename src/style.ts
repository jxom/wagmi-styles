import { getStyleSheets } from './private/getStyleSheets';
import type { StylesInput } from './types';

export function style<T>(styles: StylesInput<T>) {
  const { _styleSheet, _composedStyleSheets } = getStyleSheets({
    themeMap: { _: {} },
    getStyles: () => styles,
  });

  return {
    _styleSheet,
    _composedStyleSheets,
  };
}
