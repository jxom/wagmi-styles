import { createStyleSheets } from './private/createStyleSheets';
import type { StylesInput } from './types';

export function style<T>(styles: StylesInput<T>) {
  const { _styleSheet, _composedStyleSheets } = createStyleSheets({
    themeMap: { _: {} },
    getStyles: () => styles,
  });

  return {
    _styleSheet,
    _composedStyleSheets,
  };
}
