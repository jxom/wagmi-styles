import * as React from 'react';

export const ThemeContext = React.createContext({ theme: { _id: '_' } });

export const ThemeProvider = ({ children, theme }: any) => (
  <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
);
