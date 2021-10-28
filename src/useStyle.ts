import * as React from 'react';
import { ThemeContext } from './ThemeProvider';

export function useStyle(styleRef: any) {
  const { theme } = React.useContext<any>(ThemeContext);
  return styleRef[theme._id];
}
