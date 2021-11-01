import * as React from 'react';
import { generateThemeProvider } from './private/generateThemeProvider';

export const ThemeContext = React.createContext({ theme: { _id: '_' } });

export const ThemeProvider = (props: any) =>
  generateThemeProvider(ThemeContext)(props);
