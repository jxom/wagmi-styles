import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

import { themeA, themeB, style, ThemeProvider, useStyle } from './theme';

describe('composition', () => {
  const size = style((vars) => ({
    height: vars.sizes.small,
    width: vars.sizes.medium,
  }));
  const spacing = style({ padding: 16, margin: 8 });
  const composedStyleRef = style([
    size,
    spacing,
    {
      backgroundColor: 'red',
    },
  ]);

  function Composed() {
    const composedStyle = useStyle(composedStyleRef);
    return <View style={composedStyle} />;
  }

  [themeA, themeB].forEach((theme) => {
    test('composed style', () => {
      const { toJSON } = render(
        <ThemeProvider theme={theme}>
          <Composed />
        </ThemeProvider>
      );
      expect(toJSON()).toMatchSnapshot();
    });
  });

  ///////////////////////////////////////////////////////////////

  const composedStyleWithThemeVarsRef = style((vars) => [
    size,
    spacing,
    {
      backgroundColor: vars.colors.primary,
    },
  ]);

  function ComposedWithVars() {
    const composedWithVarsStyle = useStyle(composedStyleWithThemeVarsRef);
    return <View style={composedWithVarsStyle} />;
  }

  [themeA, themeB].forEach((theme) => {
    test('composed style with theme vars', () => {
      const { toJSON } = render(
        <ThemeProvider theme={theme}>
          <ComposedWithVars />
        </ThemeProvider>
      );
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
