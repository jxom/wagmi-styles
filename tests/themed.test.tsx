import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

import { ThemeProvider, useStyle } from '../src';
import { themeA, themeB, style } from './theme';

describe('themed', () => {
  const simpleStyleRef = style({
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  });

  function Simple() {
    const simpleStyle = useStyle(simpleStyleRef);
    return <View style={simpleStyle} />;
  }

  it('simple style', () => {
    const { toJSON } = render(
      <ThemeProvider theme={themeA}>
        <Simple />
      </ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  ///////////////////////////////////////////////////////////////////////////

  const styleWithVarsRef = style((vars) => ({
    color: vars.colors.primary,
    backgroundColor: vars.colors.secondary,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  }));

  function StyleWithVars() {
    const styleWithVars = useStyle(styleWithVarsRef);
    return <View style={styleWithVars} />;
  }

  [themeA, themeB].forEach((theme) => {
    it(`style with theme vars`, () => {
      const { toJSON } = render(
        <ThemeProvider theme={theme}>
          <StyleWithVars />
        </ThemeProvider>
      );
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
