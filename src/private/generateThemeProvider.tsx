import * as React from 'react';

export function generateThemeProvider(ThemeContext: any) {
  return ({ children, theme }: any) => (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}
