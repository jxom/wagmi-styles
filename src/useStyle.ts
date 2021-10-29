import * as React from 'react';
import { ThemeContext } from './ThemeProvider';

export function useStyle(styleRef: any) {
  const { _styleSheet, _composedStyleSheets } = styleRef;
  const { theme } = React.useContext<any>(ThemeContext);
  return [_styleSheet[theme._id], _composedStyleSheets[theme._id]];
}
